export default function MessageListDate(props: { formatDate: Date }) {
  const { formatDate } = props;
  const month = formatDate.toLocaleString("default", { month: "long" });
  const date = formatDate.getDate();
  const year = formatDate.getFullYear();
  const time = formatDate
    .toLocaleTimeString("en-US", { timeStyle: "short", hour12: true })
    .split(":")
    .slice(0, 2)
    .join(":");

  return (
    <span className="py-3 text-xs text-slate-400">
      <strong>
        {month} {date}, {year}
      </strong>{" "}
      {time}
    </span>
  );
}
