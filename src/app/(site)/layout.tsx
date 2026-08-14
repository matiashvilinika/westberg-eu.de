"use client";

import "@/styles/globals.css";

import FaviconLinks from "@/components/Common/FaviconLinks";
import GoogleAnalytics from "@/components/Common/GoogleAnalytics";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "next-themes";
import { Archivo, Heebo } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import AuthProvider from "../context/AuthContext";
import ToasterContext from "../context/ToastContext";
import { NextIntlClientProvider } from "next-intl";
import deMessages from "../../../messages/de.json";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Keep static lang to avoid hydration mismatch
  return (
    <html lang="de" suppressHydrationWarning>
      <body
        className={`${archivo.variable} ${heebo.variable}`}
        suppressHydrationWarning
      >
        <FaviconLinks />
        <GoogleAnalytics />
        <NextTopLoader
          color="#006BFF"
          crawlSpeed={300}
          showSpinner={false}
          shadow="none"
        />
        <NextIntlClientProvider 
          locale="de" 
          messages={deMessages}
          timeZone="Europe/Berlin"
        >
          <ThemeProvider
            enableSystem={false}
            attribute="class"
            defaultTheme="light"
            forcedTheme="light"
          >
            <AuthProvider>
              <ToasterContext />
              <Navbar />
              {children}
              <Footer />
            </AuthProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
