"use client";

import { useTranslations } from "next-intl";
import FooterAbout from "./FooterAbout";
import FooterBottom from "./FooterBottom";
import FooterLinkItem from "./FooterLinkItem";
import FooterNewsletter from "./FooterNewsletter";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("footer");

  const footerLinks = [
    { id: "contactUs", title: t("about.contactUs"), href: "#support" },
    { id: "careers", title: t("about.careers"), href: "/", badge: { text: t("about.soon") } },
    { id: "carSelling", title: t("about.carSelling"), href: "/", badge: { text: t("about.soon") } }
  ];

  const footerLinksTwo = [
    { id: "company", title: t("about.companyName"), href: "/" },
    { id: "press", title: t("about.pressMedia"), href: "/" },
    { id: "blog", title: t("about.ourBlog"), href: "/blog" },
    { id: "account", title: t("about.account"), href: "/auth/signin" }
  ];

  return (
    <footer className="pt-14 sm:pt-20 lg:pt-[130px]">
      <div className="px-4 xl:container">
        <div className="-mx-4 flex flex-wrap justify-between">
          <div className="w-full px-4 sm:w-1/2 md:w-5/12 lg:w-4/12 xl:w-4/12">
            <FooterAbout />
          </div>

          {/* Right side sections */}
          <div className="flex flex-wrap lg:justify-end">
            <div className="w-1/2 px-4 md:w-auto lg:w-auto">
              <div className="mb-20">
                <h3 className="mb-9 font-heading text-2xl font-medium text-dark dark:text-white">
                  {t("about.company")}
                </h3>

                <ul className="space-y-4">
                  {footerLinks.map((link) => (
                    <FooterLinkItem key={link?.id} linkItem={link} />
                  ))}
                </ul>
              </div>
            </div>

            {/* Support Section Hidden */}
            {/* <div className="w-1/2 px-4 md:w-auto lg:w-auto">
              <div className="mb-20">
                <h3 className="mb-9 font-heading text-2xl font-medium text-dark dark:text-white">
                  {t("about.supportSection")}
                </h3>

                <ul className="space-y-4">
                  {footerLinksTwo.map((link) => (
                    <FooterLinkItem key={link?.id} linkItem={link} />
                  ))}
                </ul>
              </div>
            </div> */}

            <div className="w-1/2 px-4 md:w-auto lg:w-auto lg:pl-16">
              <div className="mb-20">
                <h3 className="mb-9 font-heading text-2xl font-medium text-dark dark:text-white">
                  {t("about.getInTouch")}
                </h3>

                <div className="space-y-7">
                  <div>
                    <p className="font-heading text-base text-dark-text">
                      {t("about.tollFree")}
                    </p>
                    <a
                      href="tel:+4915162600982"
                      className="font-heading text-base text-dark hover:text-primary dark:text-white dark:hover:text-primary"
                    >
                      +4915162600982
                    </a>
                  </div>
                  <div>
                    <p className="font-heading text-base text-dark-text">
                      {t("about.liveSupport")}
                    </p>
                    <a
                      href="mailto:ceo@westberg-eu.de"
                      className="font-heading text-base text-dark hover:text-primary dark:text-white dark:hover:text-primary"
                    >
                      ceo@westberg-eu.de
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Section Hidden */}
          {/* <div className="w-full px-4 sm:w-1/2 md:w-5/12 lg:w-5/12 xl:w-3/12">
            <FooterNewsletter />
          </div> */}
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
}
