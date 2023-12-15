export default function Avatar(props: {
  src: string;
  width: number;
}): JSX.Element {
  return (
    <div
      className={`h-${props.width} w-${props.width} rounded-full border-[1.2px]`}
    >
      <img
        className={`h-${props.width} w-${props.width} rounded-full bg-slate-300 object-cover`}
        src={props.src}
      />
    </div>
  );
}
