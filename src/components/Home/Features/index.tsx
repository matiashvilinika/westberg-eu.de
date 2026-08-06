"use client";

import SectionTitle from "@/components/Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import { useTranslations } from "next-intl";
import { ShieldCheck, TrendingUp, Clock, Settings } from "lucide-react";

export default function Features() {
  const t = useTranslations("features");

  const featuresData = [
    {
      id: "feature1",
      title: t("feature1.title"),
      description: t("feature1.description"),
      icon: <ShieldCheck size={44} strokeWidth={1.5} />
    },
    {
      id: "feature2",
      title: t("feature2.title"),
      description: t("feature2.description"),
      icon: <TrendingUp size={44} strokeWidth={1.5} />
    },
    {
      id: "feature3",
      title: t("feature3.title"),
      description: t("feature3.description"),
      icon: <Clock size={44} strokeWidth={1.5} />
    },
    {
      id: "feature4",
      title: t("feature4.title"),
      description: t("feature4.description"),
      icon: <Settings size={44} strokeWidth={1.5} />
    }
  ];

  return (
    <section
      id='features'
      className='pt-14 sm:pt-20 lg:pt-[130px] bg-[#f4f5f3]'
    >
      <div className='px-4 xl:container'>
        <SectionTitle
          mainTitle={t("mainTitle")}
          title={t("title")}
          paragraph={t("paragraph")}
        />

        <div className='-mx-4 flex flex-wrap justify-center'>
          {featuresData.map((feature) => (
            <SingleFeature
              key={feature?.id}
              feature={feature}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
