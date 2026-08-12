"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

const NAV_SECTIONS = ["features", "about", "team", "support"] as const;

export default function Navbar() {
  const t = useTranslations("nav");
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  const pathUrl = usePathname();
  const isEnglish = pathUrl.startsWith("/en");
  const homePrefix = isEnglish ? "/en" : "";

  const navigationHandler = () => {
    setNavigationOpen(!navigationOpen);
    if (typeof window !== "undefined") {
      document.body.classList.toggle("overflow-hidden", !navigationOpen);
    }
  };

  const handleStickyMenu = () => {
    setStickyMenu(window.scrollY >= 80);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
    return () => window.removeEventListener("scroll", handleStickyMenu);
  }, []);

  // `usePathname()` never contains the hash, so track the active section here.
  useEffect(() => {
    const sections = NAV_SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveHash(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathUrl]);

  const linkClass = (hash: string) =>
    `font-heading text-sm font-semibold uppercase tracking-[0.15em] transition hover:text-text-primary ${
      activeHash === hash ? "text-text-primary" : "text-text-secondary"
    }`;

  return (
    <>
      <header className={`header absolute left-0 top-0 w-full ${stickyMenu ? "sticky-navbar" : ""}`}>
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 lg:px-10 lg:py-6">
          {/* Logo sized so the lockup keeps its required clear space (X = half the lockup height) on every side */}
          <Link href={`${homePrefix}/`} className="inline-flex items-center">
            <Image
              src="/images/logo/logo-dark-horizontal.svg"
              alt="West Berg Europe"
              width={389}
              height={80}
              priority
              className="h-8 w-auto lg:h-9"
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            <Link href={`${homePrefix}/#features`} className={linkClass("#features")}>
              {t("services")}
            </Link>
            <Link href={`${homePrefix}/#about`} className={linkClass("#about")}>
              {t("about")}
            </Link>
            <Link href={`${homePrefix}/#team`} className={linkClass("#team")}>
              {t("team")}
            </Link>
            <Link href={`${homePrefix}/#support`} className={linkClass("#support")}>
              {t("contact")}
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button
              onClick={navigationHandler}
              className="text-text-primary lg:hidden"
              aria-label={navigationOpen ? "Close menu" : "Open menu"}
            >
              {navigationOpen ? (
                <svg width="28" height="28" viewBox="0 0 28 28" className="fill-current">
                  <path d="M14.0002 11.8226L21.6228 4.20001L23.8002 6.37745L16.1776 14L23.8002 21.6226L21.6228 23.8L14.0002 16.1774L6.37763 23.8L4.2002 21.6226L11.8228 14L4.2002 6.37745L6.37763 4.20001L14.0002 11.8226Z" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 22 22" className="fill-current">
                  <path d="M2.75 3.66666H19.25V5.49999H2.75V3.66666ZM2.75 10.0833H19.25V11.9167H2.75V10.0833ZM2.75 16.5H19.25V18.3333H2.75V16.5Z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div
          className={`menu-wrapper fixed inset-0 z-50 flex-col overflow-y-auto bg-white p-6 lg:hidden! ${navigationOpen ? "show" : ""}`}
        >
          <div className="flex items-center justify-between">
            <Link href={`${homePrefix}/`} className="inline-flex items-center">
              <Image
                src="/images/logo/logo-dark-horizontal.svg"
                alt="West Berg Europe"
                width={389}
                height={80}
                className="h-8 w-auto"
              />
            </Link>
            <button onClick={navigationHandler} className="text-text-primary" aria-label="Close menu">
              <svg width="28" height="28" viewBox="0 0 28 28" className="fill-current">
                <path d="M14.0002 11.8226L21.6228 4.20001L23.8002 6.37745L16.1776 14L23.8002 21.6226L21.6228 23.8L14.0002 16.1774L6.37763 23.8L4.2002 21.6226L11.8228 14L4.2002 6.37745L6.37763 4.20001L14.0002 11.8226Z" />
              </svg>
            </button>
          </div>

          <nav className="mt-10">
            <ul className="space-y-6 text-center text-lg font-semibold text-text-secondary">
              <li>
                <Link href={`${homePrefix}/#features`} onClick={navigationHandler}>
                  {t("services")}
                </Link>
              </li>
              <li>
                <Link href={`${homePrefix}/#about`} onClick={navigationHandler}>
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href={`${homePrefix}/#team`} onClick={navigationHandler}>
                  {t("team")}
                </Link>
              </li>
              <li>
                <Link href={`${homePrefix}/#support`} onClick={navigationHandler}>
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
