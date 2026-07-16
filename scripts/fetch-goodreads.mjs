// Prebuild step: fetch the Goodreads RSS feed and write content/books.json.
// Zero dependencies — the feed is a stable flat XML structure, parsed with regex.
// This script NEVER exits non-zero: an offline build must still succeed.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_FEED_URL =
  "https://www.goodreads.com/review/list_rss/198386611";
const PROFILE_URL = "https://www.goodreads.com/review/list/198386611";
const FETCH_TIMEOUT_MS = 10_000;

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, "..", "content", "books.json");

/** Decode the handful of entities Goodreads emits outside CDATA. */
function decodeEntities(str) {
  return str
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

/** Extract the text content of the first <tag> in a chunk, unwrapping CDATA. */
function getTag(xml, tag) {
  const match = xml.match(
    new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`)
  );
  if (!match) return "";
  let value = match[1].trim();
  const cdata = value.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/);
  if (cdata) value = cdata[1].trim();
  return decodeEntities(value);
}

/** Strip HTML tags from a review, keeping readable plain text. */
function stripHtml(html) {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** "Fri, 26 Jun 2026 06:34:20 -0700" -> ISO string, or null. */
function toIso(rfc822) {
  if (!rfc822) return null;
  const date = new Date(rfc822);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function toNumberOrNull(str) {
  const n = Number(str);
  return str !== "" && Number.isFinite(n) ? n : null;
}

/**
 * The large image URL sometimes still carries a size suffix
 * (e.g. ...30555488._SX50_.jpg). Stripping it yields the full-size cover.
 */
function fullSizeCover(url) {
  return url.replace(/\._S[XY]\d+_(\.[a-z0-9]+)$/i, "$1");
}

function parseItem(itemXml) {
  const shelfRaw = getTag(itemXml, "user_shelves");
  return {
    title: getTag(itemXml, "title"),
    author: getTag(itemXml, "author_name").replace(/\s+/g, " "),
    coverUrl: fullSizeCover(getTag(itemXml, "book_large_image_url")),
    rating: toNumberOrNull(getTag(itemXml, "user_rating")) ?? 0,
    averageRating: toNumberOrNull(getTag(itemXml, "average_rating")) ?? 0,
    review: stripHtml(getTag(itemXml, "user_review")),
    readAt: toIso(getTag(itemXml, "user_read_at")),
    dateAdded: toIso(getTag(itemXml, "user_date_added")),
    shelf: shelfRaw === "" ? "read" : shelfRaw,
    pages: toNumberOrNull(getTag(itemXml, "num_pages")),
    published: toNumberOrNull(getTag(itemXml, "book_published")),
    goodreadsUrl: getTag(itemXml, "link"),
  };
}

function parseFeed(xml) {
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  return items.map(parseItem).filter((book) => book.title !== "");
}

async function fetchFeed(url) {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    headers: { "user-agent": "portfolio-prebuild/1.0 (+goodreads-rss)" },
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }
  return response.text();
}

async function main() {
  const feedUrl = process.env.GOODREADS_RSS_URL || DEFAULT_FEED_URL;

  try {
    const xml = await fetchFeed(feedUrl);
    const books = parseFeed(xml);
    if (books.length === 0 && !xml.includes("<channel>")) {
      throw new Error("Response does not look like a Goodreads RSS feed");
    }
    const payload = {
      fetchedAt: new Date().toISOString(),
      profileUrl: PROFILE_URL,
      books,
    };
    mkdirSync(dirname(OUT_PATH), { recursive: true });
    writeFileSync(OUT_PATH, JSON.stringify(payload, null, 2) + "\n", "utf8");
    console.log(
      `[fetch-goodreads] Wrote ${books.length} book(s) to content/books.json`
    );
  } catch (error) {
    console.warn(
      `[fetch-goodreads] WARN: could not refresh feed (${error.message}).`
    );
    if (existsSync(OUT_PATH)) {
      try {
        const existing = JSON.parse(readFileSync(OUT_PATH, "utf8"));
        console.warn(
          `[fetch-goodreads] Keeping existing content/books.json (${existing.books?.length ?? 0} book(s)).`
        );
        return;
      } catch {
        console.warn(
          "[fetch-goodreads] Existing books.json is unreadable; rewriting empty payload."
        );
      }
    }
    const fallback = { fetchedAt: null, profileUrl: PROFILE_URL, books: [] };
    mkdirSync(dirname(OUT_PATH), { recursive: true });
    writeFileSync(OUT_PATH, JSON.stringify(fallback, null, 2) + "\n", "utf8");
    console.warn("[fetch-goodreads] Wrote empty books.json fallback.");
  }
}

main();
