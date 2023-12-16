export default function Avatar(props: {
  src: string;
  alt: string;
  contnainerClass?: string;
  imageClass?: string;
}): JSX.Element {
  const container = props.contnainerClass ?? "w-10 h-10";
  const image = props.imageClass ?? "w-10 h-10";
  return (
    <div className={`${container} rounded-full border-[1.2px]`}>
      <img
        className={`${image} rounded-full bg-slate-300 object-cover`}
        src={props.src}
        alt={props.alt}
      />
    </div>
  );
}
