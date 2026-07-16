import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const description =
  "Data science portfolio of Tanay Kashyap — statistics at the University of Waterloo, machine learning internships, and an interactive 3D bookshelf.";

export const metadata: Metadata = {
  title: {
    default: "Tanay Kashyap — Data Scientist",
    template: "%s — Tanay Kashyap",
  },
  description,
  openGraph: {
    title: "Tanay Kashyap — Data Scientist",
    description,
    type: "website",
    siteName: "Tanay Kashyap",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Tanay Kashyap — Data Scientist",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider attribute="class" disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
