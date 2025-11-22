"use client";

import { teamData } from "@/static-data/team";
import SectionTitle from "../Common/SectionTitle";
import SingleTeam from "./SingleTeam";
import { useTranslations } from "next-intl";

export default function Team() {
  const t = useTranslations("team");

  return (
    <section id="team" className="pt-14 sm:pt-20 lg:pt-[130px]">
      <div className="px-4 xl:container">
        <SectionTitle
          mainTitle={t("mainTitle")}
          title={t("title")}
          paragraph={t("paragraph")}
        />

        <div className="-mx-4 flex flex-wrap justify-center">
          {teamData.map((team) => (
            <SingleTeam key={team?.id} team={team} />
          ))}
        </div>
      </div>
    </section>
  );
}
