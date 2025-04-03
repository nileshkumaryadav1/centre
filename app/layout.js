import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import MobileNavbar from "@/components/navigation/MobileNavbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Centre | A Student Led-Company for the Future",
  description: "Generated by centre Web Team",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geistSans.className}>
      <body>
        <Navbar />
        <main className="mt-16">{children}</main>
        <MobileNavbar />
        <Footer />
      </body>
    </html>
  );
}
