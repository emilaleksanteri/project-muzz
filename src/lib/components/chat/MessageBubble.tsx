import type { Message } from "../../types";

function isEmoji(input: string): boolean {
  const removeEmojis = input.replaceAll(/\p{Emoji}/gu, "");
  return removeEmojis.length === 0;
}

export default function MessageBubble(props: {
  message: Message;
  isLatest: boolean;
  groupWithPrevioues: boolean;
  isMyMessage: boolean;
}): JSX.Element {
  const { message } = props.message;
  const spacingFromBottom = props.isLatest ? "mb-[17%]" : "mb-0";
  const groupWithPrevious = props.groupWithPrevioues ? "-mt-3" : "mt-0";

  const messageIdentifyStyle = props.isMyMessage
    ? "bg-[#dd5170] text-neutral-50 rounded-l-2xl rounded-tr-2xl"
    : "bg-[#e7e9f0] text-slate-600 rounded-r-2xl rounded-tl-2xl";

  const messageIdentifyPostion = props.isMyMessage
    ? "justify-end"
    : "justify-start";

  return (
    <li
      className={`flex w-full items-center ${messageIdentifyPostion} ${spacingFromBottom} ${groupWithPrevious}`}
    >
      {isEmoji(message) ? (
        <div className="max-w-[320px]">
          <p className="text-4xl">{message}</p>
        </div>
      ) : (
        <div
          className={`leading-1.5 flex w-fit max-w-[320px] flex-col gap-2.5   p-3 ${messageIdentifyStyle}`}
        >
          <p>{message}</p>
        </div>
      )}
    </li>
  );
}
