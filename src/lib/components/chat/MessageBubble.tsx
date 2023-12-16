import type { Message } from "../../types";
import { CheckCheck } from "lucide-react";

function isEmoji(input: string): boolean {
  const removeEmojis = input.replace(/\p{Emoji}/gu, "");
  return removeEmojis.length === 0;
}

type SeenCheckProps = {
  isMyMessage: boolean;
  seenAt: Date | undefined;
  msg: string;
};

function SeenCheck(props: SeenCheckProps): JSX.Element | undefined {
  const seenAtIsEmoji = isEmoji(props.msg)
    ? "storke-slate-800"
    : "stroke-neutral-50 -mr-2";
  if (props.isMyMessage && typeof props.seenAt !== "undefined") {
    return (
      <CheckCheck
        className={`-mb-2 -mt-3 h-[14px] self-end ${seenAtIsEmoji}`}
        width={14}
      />
    );
  }
}

type MessageBubbleProps = {
  message: Message;
  isLatest: boolean;
  groupWithPrevioues: boolean;
  isMyMessage: boolean;
};

export default function MessageBubble(props: MessageBubbleProps): JSX.Element {
  const { message, isLatest, groupWithPrevioues, isMyMessage } = props;
  const spacingFromBottom = isLatest ? "mb-[17%]" : "mb-0";
  const groupWithPrevious = groupWithPrevioues ? "-mt-3" : "mt-0";

  const messageIdentifyStyle = isMyMessage
    ? "bg-[#dd5170] text-neutral-50 rounded-l-2xl rounded-tr-2xl"
    : "bg-[#e7e9f0] text-slate-600 rounded-r-2xl rounded-tl-2xl";

  const messageIdentifyPostion = isMyMessage ? "justify-end" : "justify-start";

  return (
    <li
      className={`relative flex w-full items-center ${messageIdentifyPostion} ${spacingFromBottom} ${groupWithPrevious}`}
    >
      {isEmoji(message.message) ? (
        <div className="max-w-[320px] ">
          <p className="flex flex-col gap-2.5 text-4xl">
            {message.message}
            <SeenCheck
              isMyMessage={isMyMessage}
              seenAt={message.seenAt}
              msg={message.message}
            />
          </p>
        </div>
      ) : (
        <div
          className={`leading-1.5 flex w-fit max-w-[320px] flex-col gap-2.5 p-3 ${messageIdentifyStyle}`}
        >
          <p>{message.message}</p>
          <SeenCheck
            isMyMessage={isMyMessage}
            seenAt={message.seenAt}
            msg={message.message}
          />
        </div>
      )}
    </li>
  );
}
