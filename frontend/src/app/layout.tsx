import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GrihaHomes - Find Your Perfect Home",
  description: "Property listing platform for rent and sale in India. Find flats, houses, villas, and commercial properties.",
  keywords: ["property", "rent", "sale", "flat", "house", "villa", "India", "real estate"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
