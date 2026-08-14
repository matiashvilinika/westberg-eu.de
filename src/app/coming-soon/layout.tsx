import "@/styles/globals.css";
import FaviconLinks from "@/components/Common/FaviconLinks";
import GoogleAnalytics from "@/components/Common/GoogleAnalytics";
import { Archivo, Heebo } from "next/font/google";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-archivo",
});

const heebo = Heebo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heebo",
});

export const metadata = {
  title: "Coming Soon - WESTBERG",
  description: "Something extraordinary is on its way. Get ready for launch on December 16, 2025.",
};

export default function ComingSoonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body 
        suppressHydrationWarning 
        className={`${archivo.variable} ${heebo.variable} bg-[#030014] text-white min-h-screen overflow-x-hidden`}
        style={{ backgroundColor: '#030014' }}
      >
        <FaviconLinks />
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
