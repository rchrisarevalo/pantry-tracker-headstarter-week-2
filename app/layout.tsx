import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FoodPantryInventory",
  authors: [{name: 'Ruben Arevalo', url: 'https://foodpantryinventory-ai.vercel.app/'}],
  description: "A pantry tracker that helps you efficiently keep track of the items stored.",
  keywords: 'Digital Pantry, FoodPantryInventory, Pantry, Ruben Arevalo, Ruben C. Arevalo'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
