import "@/styles/globals.css";
import FaviconLinks from "@/components/Common/FaviconLinks";
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
  title: "Admin Panel | West Berg Europe",
  description: "Admin dashboard for West Berg Europe",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${archivo.variable} ${heebo.variable} bg-slate-900 text-white`} suppressHydrationWarning>
        <FaviconLinks />
        {children}
      </body>
    </html>
  );
}

