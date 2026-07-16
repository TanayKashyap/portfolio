import { Bookshelf } from "@/components/bookshelf/Bookshelf";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/content/site";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <section
          aria-label="Introduction"
          className="px-6 pt-16 pb-14 text-center sm:pt-24 sm:pb-20"
        >
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h1 className="font-display text-5xl font-medium tracking-tight sm:text-7xl">
                {site.name}
              </h1>
              <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-foreground/70 sm:text-lg">
                {site.role}. {site.tagline}
              </p>
            </Reveal>
          </div>
          <div className="mx-auto mt-8 max-w-4xl sm:mt-10">
            <Bookshelf />
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/50">
              Hover a spine · click to open
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
