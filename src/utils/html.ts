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

export type ArticleContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string }
  | { type: "listItem"; text: string; ordered?: boolean }
  | { type: "image"; src: string; alt?: string };

function getAttribute(tag: string, name: string) {
  const match = tag.match(new RegExp(`${name}=["']([^"']+)["']`, "i"));
  return match?.[1] ? decodeEntities(match[1]) : undefined;
}

export function parseArticleContent(value?: string | null): ArticleContentBlock[] {
  if (!value) return [];

  const blocks: ArticleContentBlock[] = [];
  const source = String(value)
    .replace(/\r?\n/g, " ")
    .replace(/<br\s*\/?>/gi, "\n");

  const blockRegex =
    /<(h[1-6]|p|blockquote|ul|ol)(?:\s[^>]*)?>([\s\S]*?)<\/\1>|<img\b[^>]*>/gi;

  for (const match of source.matchAll(blockRegex)) {
    const fullMatch = match[0];
    const tagName = match[1]?.toLowerCase();

    if (fullMatch.toLowerCase().startsWith("<img")) {
      const src = getAttribute(fullMatch, "src");
      if (src) {
        blocks.push({
          type: "image",
          src,
          alt: getAttribute(fullMatch, "alt"),
        });
      }
      continue;
    }

    const text = stripHtml(match[2]).replace(/\n+/g, "\n").trim();
    if (!text) continue;

    if (tagName === "ul" || tagName === "ol") {
      const ordered = tagName === "ol";
      const listItems = [...match[2].matchAll(/<li(?:\s[^>]*)?>([\s\S]*?)<\/li>/gi)];
      listItems.forEach((listItem) => {
        const itemText = stripHtml(listItem[1]).trim();
        if (itemText) {
          blocks.push({ type: "listItem", text: itemText, ordered });
        }
      });
    } else if (tagName?.startsWith("h")) {
      blocks.push({ type: "heading", text });
    } else if (tagName === "blockquote") {
      blocks.push({ type: "quote", text });
    } else {
      blocks.push({ type: "paragraph", text });
    }
  }

  if (!blocks.length) {
    const fallback = stripHtml(value);
    return fallback ? [{ type: "paragraph", text: fallback }] : [];
  }

  return blocks;
}
