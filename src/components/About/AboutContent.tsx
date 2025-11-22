"use client";

import { useState } from "react";
import TabPanel from "./TabPanel";
import { useTranslations } from "next-intl";

export default function AboutContent() {
  const t = useTranslations("about");
  const tCompany = useTranslations("company");

  const tabButtons = [
    {
      id: "about",
      title: t("aboutTitle"),
      value: "about"
    },
    {
      id: "mission",
      title: t("missionTitle"),
      value: "mission"
    },
    {
      id: "vision",
      title: t("visionTitle"),
      value: "vision"
    }
  ];

  const [activeTab, setActiveTab] = useState<string>(tabButtons[0].value);

  return (
    <>
      <div className='tabButtons flex w-full items-center justify-around'>
        {tabButtons.map((tabButton) => (
          <button
            key={tabButton?.id}
            onClick={() => setActiveTab(tabButton?.value)}
            className={`w-full border-b px-2 pb-6 pt-8 font-heading text-base font-medium lg:pb-7 lg:pt-9 ${activeTab === tabButton?.value ? "border-primary text-primary dark:border-primary" : "hover:border-primary hover:text-primary dark:border-[#4B4E56] dark:text-white dark:hover:border-primary"}`}
          >
            {tabButton?.title}
          </button>
        ))}
      </div>
      <div className='w-full'>
        {activeTab === "about" && (
          <TabPanel
            title={tCompany("focusTitle")}
            image1='/images/about/image-1.jpg'
            image1Alt='about image 1'
            image2='/images/about/image-2.jpg'
            image2Alt='about image 2'
          >
            <p className='mb-6 text-base text-dark-text'>
              {t("aboutDescription")}
            </p>
            <div className='mb-6'>
              <h4 className='mb-4 font-heading text-lg font-semibold text-dark-text dark:text-white'>
                {tCompany("focusTitle")}:
              </h4>
              <ul className='list-disc pl-6 space-y-2 text-base text-dark-text'>
                <li>{tCompany("focus1")}</li>
                <li>{tCompany("focus2")}</li>
                <li>{tCompany("focus3")}</li>
                <li>{tCompany("focus4")}</li>
                <li>{tCompany("focus5")}</li>
              </ul>
            </div>
            <p className='text-base text-dark-text font-medium'>
              {tCompany("values")}
            </p>
          </TabPanel>
        )}

        {activeTab === "mission" && (
          <TabPanel
            title={t("missionTitle")}
            image1='/images/about/image-1.jpg'
            image1Alt='about image 1'
            image2='/images/about/image-2.jpg'
            image2Alt='about image 2'
            leftContent
          >
            <p className='mb-6 text-base text-dark-text'>
              {t("missionDescription")}
            </p>
          </TabPanel>
        )}

        {activeTab === "vision" && (
          <TabPanel
            title={t("visionTitle")}
            image1='/images/about/image-1.jpg'
            image1Alt='about image 1'
            image2='/images/about/image-2.jpg'
            image2Alt='about image 2'
          >
            <p className='mb-6 text-base text-dark-text'>
              {t("visionDescription")}
            </p>
          </TabPanel>
        )}
      </div>
    </>
  );
}
