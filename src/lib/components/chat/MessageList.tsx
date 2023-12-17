import Matched from "./Matched";
import { useEffect, useRef } from "react";
import { useChat } from "../../store";
import type { Message as MessageT } from "../../types";
import Message from "./Message";

function isHourBetweenMessages(
  message1: MessageT,
  message2: MessageT,
): boolean {
  return (
    message1.sentAt.getTime() - message2.sentAt.getTime() >= 1000 * 60 * 60
  );
}

function isUserMessageBurst(message1: MessageT, message2: MessageT): boolean {
  return (
    message1.user.id === message2.user.id &&
    message1.sentAt.getTime() - message2.sentAt.getTime() <= 1000 * 20
  );
}

export default function MessagesList(): JSX.Element {
  const { messages, match } = useChat();

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return (
    <ul className="flex w-full flex-col gap-4 px-4 py-2">
      <Matched matchedOn={match.matched} />
      {messages.map((msg, i) => (
        <Message
          key={msg.id}
          msg={msg}
          i={i}
          hourBetweenMessages={
            i !== 0 && isHourBetweenMessages(msg, messages[i - 1])
          }
          userMessageBurst={i !== 0 && isUserMessageBurst(msg, messages[i - 1])}
          isLatest={i === messages.length - 1}
        />
      ))}
      <div ref={bottomRef} />
    </ul>
  );
}
