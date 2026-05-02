import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Issa Alkhoury - Computer Engineer Portfolio",
  description: "Computer engineer based in Las Vegas, NV.",
  openGraph: {
    title: "Issa Alkhoury - Computer Engineer Portfolio",
    description: "Computer engineer based in Las Vegas, NV.",
    siteName: "Issa Alkhoury Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Issa Alkhoury - Computer Engineer Portfolio",
    description: "Computer engineer based in Las Vegas, NV.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
