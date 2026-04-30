import type { Metadata } from "next";
import { Pixelify_Sans } from "next/font/google"; // Import Pixelify Sans
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; 

const pixelFont = Pixelify_Sans({
  variable: "--font-pixel",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "IoT Edge | MITS Gwalior",
  description: "Official IoT and Embedded Systems Club of MITS Gwalior",
  icons: {
    icon: "/assets/iotEdge_logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${pixelFont.variable}`}>
      <body className="antialiased min-h-screen bg-iot-light flex flex-col">
        <Navbar />
        {/* Changed main to flex-grow to push footer down on short pages */}
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}