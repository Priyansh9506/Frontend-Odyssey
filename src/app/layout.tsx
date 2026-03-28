import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";

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
  title: "The Hypertext Herald | History of Web",
  description: "An immersive, newspaper-style journey through the evolution of the World Wide Web. From ARPANET to Web3, explore the timelines, crashes, and revolutions of the digital age.",
  keywords: ["history of web", "hypertext herald", "arpanet", "world wide web", "web history", "internet timeline", "dot com bubble", "web3", "social media history"],
  authors: [{ name: "The Hypertext Herald" }],
  creator: "The Hypertext Herald",
  openGraph: {
    title: "The Hypertext Herald | History of Web",
    description: "An immersive, newspaper-style journey through the evolution of the World Wide Web. Experience the history of the internet.",
    url: "https://thehypertextherald.vercel.app",
    siteName: "The Hypertext Herald",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "The Hypertext Herald Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Hypertext Herald | History of Web",
    description: "An immersive, newspaper-style journey through the evolution of the World Wide Web. Experience the history of the internet.",
    images: ["/icon.png"],
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
    >
      <head>
        <link rel="preload" href="/fonts/OldNewspaperTypes.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink selection:bg-accent selection:text-white">
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}


export default RootLayout;
