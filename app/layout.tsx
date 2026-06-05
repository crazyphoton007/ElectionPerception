import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kheri Youth Pulse",
  description: "A demo public mood simulation for Lakhimpur Kheri",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
