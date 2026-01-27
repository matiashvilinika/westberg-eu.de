"use client";

import { useTranslations } from "next-intl";

export default function FooterBottom() {
  const t = useTranslations("footer");

  return (
    <div className="dark:border-[#2E333D] md:border-t">
      <div className="-mx-4 flex flex-wrap py-5 md:py-7">
        <div className="w-full px-4 md:w-1/2 lg:w-2/3">
          <div className="mb-5 flex items-center justify-center space-x-5 border-b pb-5 dark:border-[#2E333D] md:mb-0 md:justify-start md:border-0 md:pb-0">
            <a
              href="#"
              className="font-heading text-base text-dark-text hover:text-primary"
            >
              {t("privacy")}
            </a>
            <a
              href="#"
              className="font-heading text-base text-dark-text hover:text-primary"
            >
              {t("support")}
            </a>
            <a
              href="/legal-notice"
              className="font-heading text-base text-dark-text hover:text-primary"
            >
              {t("legalNotice")}
            </a>
          </div>
        </div>
        <div className="w-full px-4 md:w-1/2 lg:w-1/3">
          <div>
            <p className="text-center font-heading text-base text-dark-text lg:text-right">
              © {new Date().getFullYear()} Westberg Europe. {t("rights")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
