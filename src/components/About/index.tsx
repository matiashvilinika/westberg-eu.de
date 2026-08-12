"use client";

import SectionTitle from "../Common/SectionTitle";
import AboutContent from "./AboutContent";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="pt-14 sm:pt-20 lg:pt-[130px] bg-[#fff]">
      <div className="px-4 xl:container">
        <SectionTitle
          mainTitle={t("mainTitle")}
          title={t("title")}
          paragraph={t("paragraph")}
        />

        <div className=" relative z-10 overflow-hidden rounded-sm bg-[#fff] px-8 pb-8 pt-0 md:px-[70px] md:pb-[70px] lg:px-[60px] lg:pb-[60px] xl:px-[70px] xl:pb-[70px]">
          <AboutContent />
        </div>
      </div>
    </section>
  );
}
