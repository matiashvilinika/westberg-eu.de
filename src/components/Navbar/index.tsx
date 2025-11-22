"use client";

import { onScroll } from "@/utils/scrollActive";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import GlobalSearchModal from "../GlobalSearch";
import ThemeToggler from "./ThemeToggler";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("nav");
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [dropdownToggler, setDropdownToggler] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const { data: session } = useSession();

  const pathUrl = usePathname();

  const navigationHandler = () => {
    setNavigationOpen(!navigationOpen);
    if (typeof window !== "undefined") {
      document.body.classList.toggle("max-lg:overflow-hidden", !navigationOpen);
    }
  };

  // Sticky menu
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
  });

  useEffect(() => {
    if (window.location.pathname === "/") {
      window.addEventListener("scroll", onScroll);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`header absolute left-0 top-0 w-full ${stickyMenu ? "sticky-navbar" : ""}`}
      >
        <div className="flex w-full flex-wrap px-5 lg:flex-nowrap lg:items-center lg:px-5 xl:px-10 2xl:px-20">
          <div className="z-99 relative max-w-[250px] pr-4 lg:w-full lg:max-w-[220px] xl:max-w-[280px]">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo/logo-dark.svg"
                alt="logo"
                width={215}
                height={50}
                className="hidden dark:block"
              />
              <Image
                src="/images/logo/logo-light.svg"
                alt="logo"
                width={215}
                height={50}
                className="dark:hidden"
              />
            </Link>
          </div>

          <div
            className={`menu-wrapper dark:bg-dark fixed left-0 top-0 z-50 h-screen w-full justify-center bg-white p-5 lg:visible lg:static lg:flex lg:h-auto lg:justify-start lg:bg-transparent lg:p-0 lg:opacity-100 dark:lg:bg-transparent ${navigationOpen ? "show" : ""}`}
          >
            <div className="w-full self-center">
              <nav>
                <ul className="navbar flex flex-col items-center justify-center space-y-5 text-center lg:flex-row lg:justify-start lg:space-x-6 lg:space-y-0 xl:space-x-10">
                  <li>
                    <Link
                      href="#features"
                      onClick={navigationHandler}
                      className={`${pathUrl === "#features" ? "active" : ""} font-heading text-dark-text hover:text-primary inline-flex items-center justify-center text-center text-base dark:hover:text-white menu-scroll`}
                    >
                      {t("services")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#about"
                      onClick={navigationHandler}
                      className={`${pathUrl === "#about" ? "active" : ""} font-heading text-dark-text hover:text-primary inline-flex items-center justify-center text-center text-base dark:hover:text-white menu-scroll`}
                    >
                      {t("about")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#team"
                      onClick={navigationHandler}
                      className={`${pathUrl === "#team" ? "active" : ""} font-heading text-dark-text hover:text-primary inline-flex items-center justify-center text-center text-base dark:hover:text-white menu-scroll`}
                    >
                      {t("team")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#support"
                      onClick={navigationHandler}
                      className={`${pathUrl === "#support" ? "active" : ""} font-heading text-dark-text hover:text-primary inline-flex items-center justify-center text-center text-base dark:hover:text-white menu-scroll`}
                    >
                      {t("contact")}
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            {/* Authentication buttons hidden */}
            {/* <div className="absolute bottom-0 left-0 flex w-full items-center justify-between space-x-5 self-end p-5 lg:static lg:w-auto lg:self-center lg:p-0">
              {session ? (
                <>
                  <p className="text-dark-text whitespace-nowrap dark:text-white">
                    {session?.user?.name}
                  </p>
                  <button
                    aria-label="SignOut"
                    onClick={() => signOut()}
                    className="text-dark-text hover:text-primary whitespace-nowrap font-medium"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    className="bg-primary font-heading hover:bg-primary/90 w-full whitespace-nowrap rounded-sm px-6 py-3 text-center text-white lg:w-auto"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="font-heading hover:bg-primary/90 w-full whitespace-nowrap rounded-sm bg-[#222C40] px-6 py-3 text-center text-white lg:w-auto"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div> */}
          </div>

            <div className="absolute right-5 top-1/2 z-50 flex -translate-y-1/2 items-center space-x-3 lg:static lg:ml-4 lg:translate-y-0 xl:ml-6">
              <div className="flex items-center justify-end">
              {/* Search hidden and disabled */}
              <button
                aria-hidden="true"
                tabIndex={-1}
                className="hidden h-10 w-10"
              />

              <div className="hidden relative flex h-10 w-10 items-center justify-center">
                <ThemeToggler />
              </div>
              <LanguageSwitcher />
            </div>

            <button
              onClick={navigationHandler}
              className="text-dark-text relative z-50 flex h-10 w-10 items-center justify-center lg:hidden dark:text-white"
            >
              {navigationOpen ? (
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  className="fill-current"
                >
                  <path d="M14.0002 11.8226L21.6228 4.20001L23.8002 6.37745L16.1776 14L23.8002 21.6226L21.6228 23.8L14.0002 16.1774L6.37763 23.8L4.2002 21.6226L11.8228 14L4.2002 6.37745L6.37763 4.20001L14.0002 11.8226Z" />
                </svg>
              ) : (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  className="fill-current"
                >
                  <path d="M2.75 3.66666H19.25V5.49999H2.75V3.66666ZM2.75 10.0833H19.25V11.9167H2.75V10.0833ZM2.75 16.5H19.25V18.3333H2.75V16.5Z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {searchModalOpen && (
        <GlobalSearchModal
          searchModalOpen={searchModalOpen}
          setSearchModalOpen={setSearchModalOpen}
        />
      )}
    </>
  );
}
