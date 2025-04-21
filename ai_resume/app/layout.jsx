import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  className: "geist-sans", // Add className parameter
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  className: "geist-mono", // Add className parameter
});


export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased ` }
      >
        {children}
      </body>
    </html>
  );
}
