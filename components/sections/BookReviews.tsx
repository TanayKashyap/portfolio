import { Reveal } from "@/components/reveal";
import { SectionHeading } from "./SectionHeading";
import booksData from "@/content/books.json";

interface Book {
  title: string;
  author: string;
  coverUrl: string;
  rating: number;
  averageRating: number;
  review: string;
  readAt: string | null;
  dateAdded: string | null;
  shelf: string;
  pages: number | null;
  published: number | null;
  goodreadsUrl: string;
}

const { profileUrl, books } = booksData as {
  fetchedAt: string | null;
  profileUrl: string;
  books: Book[];
};

function Stars({ rating }: { rating: number }) {
  return (
    <span
      role="img"
      aria-label={`Rated ${rating} of 5`}
      className="font-mono text-sm tracking-tight text-accent"
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} aria-hidden="true" className={i < rating ? "" : "opacity-30"}>
          ★
        </span>
      ))}
    </span>
  );
}

function Cover({ book, sizeClass }: { book: Book; sizeClass: string }) {
  return (
    <div
      className={`${sizeClass} shrink-0 overflow-hidden rounded-sm bg-accent-soft/40 shadow-md ring-1 ring-foreground/10 motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:group-hover:-translate-y-1.5 group-hover:shadow-lg`}
    >
      <img
        src={book.coverUrl}
        alt={`Cover of ${book.title} by ${book.author}`}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

function formatReadAt(iso: string | null): string | null {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function BookReviews() {
  const currentlyReading = books.filter((b) => b.shelf === "currently-reading");
  const read = books.filter((b) => b.shelf === "read");
  const toReadCount = books.filter((b) => b.shelf === "to-read").length;
  const isEmpty = books.length === 0;

  return (
    <section
      id="books"
      aria-labelledby="books-heading"
      className="scroll-mt-24 px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          headingId="books-heading"
          eyebrow={
            isEmpty
              ? "Synced from Goodreads"
              : `${books.length} books · synced from Goodreads`
          }
          title="Book Reviews"
        />
        <Reveal delay={0.08}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/75 sm:text-lg">
            What I&apos;ve been reading off the clock, pulled straight from my
            Goodreads shelf at build time.
          </p>
        </Reveal>

        {isEmpty ? (
          <Reveal delay={0.14}>
            <div className="mt-10 rounded-2xl border border-dashed border-accent/40 bg-accent-soft/15 px-6 py-14 text-center sm:px-12">
              {/* Empty bookends — deliberate, not an error */}
              <p aria-hidden="true" className="font-display text-4xl text-shelf">
                ⌐ ¬
              </p>
              <p className="mt-4 font-display text-xl tracking-tight sm:text-2xl">
                The shelf is being restocked.
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-foreground/70">
                New reads and reviews land here automatically the next time the
                site is built. In the meantime, the full collection lives on
                Goodreads.
              </p>
              <a
                href={profileUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center gap-2 border border-accent/40 px-5 py-2.5 font-mono text-sm text-accent transition-colors hover:bg-accent hover:text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Browse my Goodreads ↗
              </a>
            </div>
          </Reveal>
        ) : (
          <>
            {currentlyReading.length > 0 && (
              <Reveal delay={0.14} className="mt-10">
                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/65">
                  Currently reading
                </h2>
                <ul className="mt-4 space-y-4">
                  {currentlyReading.map((book) => (
                    <li key={book.goodreadsUrl}>
                      <a
                        href={book.goodreadsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center gap-5 rounded-2xl border border-accent/30 bg-accent-soft/20 p-4 transition-colors hover:border-accent/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:p-5"
                      >
                        <Cover book={book} sizeClass="w-16 sm:w-20 aspect-[2/3]" />
                        <div className="min-w-0">
                          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-accent">
                            <span
                              aria-hidden="true"
                              className="h-1.5 w-1.5 rounded-full bg-accent motion-safe:animate-pulse"
                            />
                            in progress
                          </span>
                          <p className="mt-1 truncate font-display text-lg font-medium tracking-tight sm:text-xl">
                            {book.title}
                          </p>
                          <p className="truncate text-sm text-foreground/70">
                            {book.author}
                          </p>
                          {book.pages !== null && (
                            <p className="mt-1 font-mono text-xs text-foreground/65">
                              {book.pages} pages
                              {book.published !== null && ` · ${book.published}`}
                            </p>
                          )}
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {read.length > 0 && (
              <Reveal delay={0.2} className="mt-12">
                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/65">
                  Off the shelf
                </h2>
                <ul className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {read.map((book) => (
                    <li key={book.goodreadsUrl} className="h-full">
                      <a
                        href={book.goodreadsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex h-full gap-4 rounded-2xl border border-foreground/10 bg-background p-4 transition-colors hover:border-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        <Cover book={book} sizeClass="w-16 aspect-[2/3]" />
                        <div className="min-w-0 flex-1">
                          <p className="font-display font-medium leading-snug tracking-tight">
                            {book.title}
                          </p>
                          <p className="mt-0.5 truncate text-sm text-foreground/70">
                            {book.author}
                          </p>
                          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                            {book.rating > 0 && <Stars rating={book.rating} />}
                            {formatReadAt(book.readAt) && (
                              <span className="font-mono text-xs text-foreground/65">
                                read {formatReadAt(book.readAt)}
                              </span>
                            )}
                          </div>
                          {book.review && (
                            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-foreground/70">
                              &ldquo;{book.review}&rdquo;
                            </p>
                          )}
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            <Reveal
              delay={0.24}
              className="mt-10 flex flex-wrap items-baseline justify-between gap-3 border-t border-foreground/10 pt-6"
            >
              {toReadCount > 0 && (
                <p className="font-mono text-xs text-foreground/65">
                  +{toReadCount} waiting on the to-read pile
                </p>
              )}
              <a
                href={profileUrl}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-sm text-accent underline-offset-4 transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Full shelf on Goodreads →
              </a>
            </Reveal>
          </>
        )}
      </div>
    </section>
  );
}
