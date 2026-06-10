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
