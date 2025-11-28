import { Team } from "@/types/team";
import Image from "next/image";

export default function SingleTeam({ team }: { team: Team }) {
  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/4">
      <div className="xs:max-w-[370px] group mx-auto mb-10 max-w-[300px] text-center">
        <div className="aspect-360/370 relative mb-8 overflow-hidden rounded-sm">
          <Image
            src={team?.image}
            alt={team?.name}
            fill
            className="w-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-heading text-dark mb-1 text-xl font-medium sm:text-2xl dark:text-white">
            {team?.name}
          </h3>
          <p className="font-heading text-dark-text text-base">
            {team?.designation}
          </p>
        </div>
      </div>
    </div>
  );
}
