import type { Metadata } from "next";

import { SectionPage } from "@/components/section-page";
import { BookReviews } from "@/components/sections/BookReviews";

export const metadata: Metadata = {
  title: "Book Reviews",
  description:
    "What Tanay Kashyap is reading — ratings and reviews synced from Goodreads.",
};

export default function BooksPage() {
  return (
    <SectionPage>
      <BookReviews />
    </SectionPage>
  );
}
