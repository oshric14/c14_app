/**
 * The c14 API delivers article titles/subtitles as HTML strings (the web uses
 * `dangerouslySetInnerHTML`). React Native `<Text>` can't render markup, so we
 * strip tags and decode the handful of entities that actually show up.
 */

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  shy: "",
  ldquo: "\u201C",
  rdquo: "\u201D",
  lsquo: "\u2018",
  rsquo: "\u2019",
  hellip: "\u2026",
  ndash: "\u2013",
  mdash: "\u2014",
};

function decodeEntities(input: string): string {
  return input.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, body: string) => {
    if (body[0] === "#") {
      const isHex = body[1] === "x" || body[1] === "X";
      const code = parseInt(body.slice(isHex ? 2 : 1), isHex ? 16 : 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : match;
    }
    const named = NAMED_ENTITIES[body.toLowerCase()];
    return named !== undefined ? named : match;
  });
}

export function stripHtml(value?: string | null): string {
  if (!value) return "";
  return decodeEntities(
    value
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<\/(p|div|h[1-6]|li)>/gi, " ")
      .replace(/<[^>]+>/g, ""),
  )
    .replace(/\s+/g, " ")
    .trim();
}

/** A run of text inside a paragraph; `href` marks it as a tappable link. */
export type InlineSegment = { text: string; href?: string };

export type ArticleContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; segments: InlineSegment[] }
  | { type: "quote"; text: string }
  | { type: "image"; src: string; alt?: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "embed"; url: string; label: string };

function getAttribute(tag: string, name: string) {
  const match = tag.match(new RegExp(`${name}=["']([^"']+)["']`, "i"));
  return match?.[1] ? decodeEntities(match[1]) : undefined;
}

/** Tag-strip + entity-decode + whitespace-collapse, without trimming edges. */
function cleanInline(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ");
}

/** Split a paragraph's inner HTML into text/link segments. */
function parseInline(html: string): InlineSegment[] {
  const segments: InlineSegment[] = [];
  const linkRegex = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(html)) !== null) {
    const before = cleanInline(html.slice(lastIndex, match.index));
    if (before.trim()) segments.push({ text: before });

    const linkText = cleanInline(match[2]).trim();
    if (linkText) segments.push({ text: linkText, href: decodeEntities(match[1]) });

    lastIndex = match.index + match[0].length;
  }

  const tail = cleanInline(html.slice(lastIndex));
  if (tail.trim()) segments.push({ text: tail });

  return segments;
}

const EMBED_LABELS: { test: RegExp; label: string }[] = [
  { test: /twitter-tweet|twitter\.com|x\.com/i, label: "צפייה בפוסט ב-X" },
  { test: /instagram-media|instagram\.com/i, label: "צפייה בפוסט באינסטגרם" },
  { test: /tiktok-embed|tiktok\.com/i, label: "צפייה בסרטון ב-TikTok" },
  { test: /youtube\.com|youtu\.be/i, label: "צפייה בסרטון ביוטיוב" },
];

function embedLabelFor(source: string): string {
  return EMBED_LABELS.find((entry) => entry.test.test(source))?.label ?? "צפייה בתוכן מוטמע";
}

function firstHref(html: string): string | undefined {
  return getAttribute(html, "href");
}

export function parseArticleContent(value?: string | null): ArticleContentBlock[] {
  if (!value) return [];

  const blocks: ArticleContentBlock[] = [];
  const source = String(value)
    .replace(/\r?\n/g, " ")
    .replace(/<br\s*\/?>/gi, "\n");

  const blockRegex =
    /<(h[1-6]|p|blockquote|ul|ol)\b(?:\s[^>]*)?>([\s\S]*?)<\/\1>|<img\b[^>]*>|<iframe\b[^>]*>(?:[\s\S]*?<\/iframe>)?/gi;

  for (const match of source.matchAll(blockRegex)) {
    const fullMatch = match[0];
    const lower = fullMatch.toLowerCase();
    const tagName = match[1]?.toLowerCase();
    const inner = match[2] ?? "";

    if (lower.startsWith("<img")) {
      const src = getAttribute(fullMatch, "src");
      if (src) blocks.push({ type: "image", src, alt: getAttribute(fullMatch, "alt") });
      continue;
    }

    if (lower.startsWith("<iframe")) {
      const src = getAttribute(fullMatch, "src");
      if (src) blocks.push({ type: "embed", url: src, label: embedLabelFor(src) });
      continue;
    }

    if (tagName === "ul" || tagName === "ol") {
      const items = [...inner.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)]
        .map((li) => stripHtml(li[1]))
        .filter(Boolean);
      if (items.length) blocks.push({ type: "list", ordered: tagName === "ol", items });
      continue;
    }

    if (tagName?.startsWith("h")) {
      const text = stripHtml(inner);
      if (text) blocks.push({ type: "heading", text });
      continue;
    }

    if (tagName === "blockquote") {
      // Social blockquotes (Twitter/Instagram/TikTok) become "open in browser"
      // embeds; everything else is a real pull-quote.
      if (/twitter-tweet|instagram-media|tiktok-embed/i.test(fullMatch)) {
        const url = firstHref(inner);
        if (url) blocks.push({ type: "embed", url, label: embedLabelFor(fullMatch) });
        continue;
      }
      const text = stripHtml(inner);
      if (text) blocks.push({ type: "quote", text });
      continue;
    }

    // Paragraph: a wrapped image/iframe takes priority over text.
    const wrappedImg = inner.match(/<img\b[^>]*>/i);
    if (wrappedImg) {
      const src = getAttribute(wrappedImg[0], "src");
      if (src) blocks.push({ type: "image", src, alt: getAttribute(wrappedImg[0], "alt") });
      continue;
    }

    const wrappedIframe = inner.match(/<iframe\b[^>]*>/i);
    if (wrappedIframe) {
      const src = getAttribute(wrappedIframe[0], "src");
      if (src) blocks.push({ type: "embed", url: src, label: embedLabelFor(src) });
      continue;
    }

    const segments = parseInline(inner);
    if (segments.length) blocks.push({ type: "paragraph", segments });
  }

  if (!blocks.length) {
    const fallback = stripHtml(value);
    return fallback ? [{ type: "paragraph", segments: [{ text: fallback }] }] : [];
  }

  return blocks;
}
