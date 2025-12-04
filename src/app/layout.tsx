import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ぶどう屋 | 厳選ぶどうの通販サイト",
  description: "国産・輸入ブドウの品種別EC販売。シャインマスカット、巨峰、ピオーネなど旬の新鮮なブドウをお届けします。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
