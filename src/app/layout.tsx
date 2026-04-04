import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";
import { Analytics } from "@vercel/analytics/react";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://history-of-web.vercel.app"),
  title: "The Hypertext Herald | History of Web",
  description: "An immersive, newspaper-style journey through the evolution of the World Wide Web. From ARPANET to Web3, explore the timelines, crashes, and revolutions of the digital age.",
  keywords: ["history of web", "hypertext herald", "arpanet", "world wide web", "web history", "internet timeline", "dot com bubble", "web3", "social media history"],
  authors: [{ name: "The Hypertext Herald" }],
  creator: "The Hypertext Herald",
  openGraph: {
    title: "The Hypertext Herald | History of Web",
    description: "An immersive, newspaper-style journey through the evolution of the World Wide Web. Experience the history of the internet.",
    url: "https://history-of-web.vercel.app",
    siteName: "The Hypertext Herald",
    images: [
      {
        url: "https://history-of-web.vercel.app/icon.png",
        width: 1200,
        height: 630,
        alt: "The Hypertext Herald Logo",
        type: "image/png",
      },
      {
        url: "https://history-of-web.vercel.app/icon.png",
        width: 400,
        height: 400,
        alt: "The Hypertext Herald - Square",
        type: "image/png",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Hypertext Herald | History of Web",
    description: "An immersive, newspaper-style journey through the evolution of the World Wide Web. Experience the history of the internet.",
    images: ["https://history-of-web.vercel.app/icon.png"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preload" href="/fonts/OldNewspaperTypes.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />

        {/* Primary Meta Tags */}
        <meta name="title" content="The Hypertext Herald | History of Web" />
        <meta name="description" content="An immersive, newspaper-style journey through the evolution of the World Wide Web. Experience the history of the internet." />

        {/* Open Graph / Facebook / WhatsApp / Instagram */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://history-of-web.vercel.app/" />
        <meta property="og:title" content="The Hypertext Herald | History of Web" />
        <meta property="og:description" content="An immersive, newspaper-style journey through the evolution of the World Wide Web. Experience the history of the internet." />
        <meta property="og:image" content="https://history-of-web.vercel.app/icon.png" />
        <meta property="og:image:secure_url" content="https://history-of-web.vercel.app/icon.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://history-of-web.vercel.app/" />
        <meta name="twitter:title" content="The Hypertext Herald | History of Web" />
        <meta name="twitter:description" content="An immersive, newspaper-style journey through the evolution of the World Wide Web. Experience the history of the internet." />
        <meta name="twitter:image" content="https://history-of-web.vercel.app/icon.png" />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink selection:bg-accent selection:text-white" suppressHydrationWarning>
        <SmoothScrolling>{children}</SmoothScrolling>
        <Analytics />
      </body>
    </html>
  );
}


export default RootLayout;
