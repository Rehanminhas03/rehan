import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "For My Love - Aqsa Batool",
  description: "A love letter written in code, for the love of my life.",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💕</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased custom-cursor">
        {children}
      </body>
    </html>
  );
}
