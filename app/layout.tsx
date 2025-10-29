import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Filters Demo",
  description: "Filters component demo with admin orders API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
