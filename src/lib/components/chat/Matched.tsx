import MonthDayYearTime from "../atoms/MonthDayYearTime";

export default function MatchText(props: { matchedOn: Date }): JSX.Element {
  return (
    <li className="w- full flex flex-col items-center justify-center">
      <MonthDayYearTime formatDate={props.matchedOn} />
      <p className="pb-4 font-serif text-2xl font-bold text-slate-700">
        You matched 🎈
      </p>
    </li>
  );
}
