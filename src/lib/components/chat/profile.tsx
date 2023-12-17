import {
  Ruler,
  Gem,
  Baby,
  Calendar,
  Plane,
  Moon,
  Speech,
  Utensils,
  Cigarette,
  Wine,
} from "lucide-react";
import type { Match } from "../../types";

type InfoItemLabelProps = {
  identifier:
    | "height"
    | "hasBeenMarried"
    | "children"
    | "marriagePlans"
    | "locationPlan"
    | "religion"
    | "activity"
    | "prays"
    | "food"
    | "smokes"
    | "drinks";
  value: string;
};

function InfoItemLabel(props: InfoItemLabelProps): JSX.Element {
  const keyToIconMap = {
    height: <Ruler width={21} height={21} />,
    hasBeenMarried: <Gem width={21} height={21} />,
    children: <Baby width={21} height={21} />,
    marriagePlans: <Calendar width={21} height={21} />,
    locationPlan: <Plane width={21} height={21} />,
    religion: <Moon width={21} height={21} />,
    activity: <Moon width={21} height={21} />,
    prays: <Speech width={21} height={21} />,
    food: <Utensils width={21} height={21} />,
    smokes: <Cigarette width={21} height={21} />,
    drinks: <Wine width={21} height={21} />,
  };

  return (
    <li className="flex w-fit items-center gap-2 rounded-full bg-zinc-200 px-4 py-2 font-semibold ">
      {keyToIconMap[props.identifier]}
      <span className="capitalize text-slate-800">{props.value}</span>
    </li>
  );
}

export default function Profile(props: { match: Match }): JSX.Element {
  const { match } = props;
  return (
    <div className="flex h-full w-full items-start justify-center">
      <section className="flex w-full flex-col items-stretch justify-center gap-4 px-6 py-10 lg:flex-row">
        <div className="w-full xl:w-[50%] 2xl:w-[40%]">
          <img
            src={match.image}
            alt={`${match.name} picture`}
            className=" h-80 w-80 rounded-lg object-cover"
          />
        </div>
        <div className="flex h-full w-fit flex-col gap-4">
          <h2 className="text-3xl font-bold text-slate-800">{match.name}</h2>
          <div>
            <p className="text-xl font-semibold text-slate-800">Bio</p>
            <p className="font-thin">{match.info.bio}</p>
          </div>
          <p className="text-xl font-semibold text-slate-800">Basic info</p>
          <ul className="flex flex-wrap items-center justify-start gap-2">
            {match.info.basicInfo.map((info) => (
              <InfoItemLabel
                key={info.key}
                value={info.value}
                identifier={info.key}
              />
            ))}
          </ul>

          <p className="text-xl font-semibold text-slate-800">Religiosity</p>
          <ul className="flex flex-wrap items-center justify-start gap-2">
            {match.info.religiosity.map((info) => (
              <InfoItemLabel
                key={info.key}
                value={info.value}
                identifier={info.key}
              />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
