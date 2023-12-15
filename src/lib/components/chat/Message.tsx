import type { Message } from "../../types";
import { useUser } from "../../store";
import MessageBubble from "./MessageBubble";
import MonthDayYearTime from "../atoms/MonthDayYearTime";

export default function Message(props: {
  msg: Message;
  i: number;
  hourBetweenMessages: boolean;
  userMessageBurst: boolean;
  isLatest: boolean;
}): JSX.Element {
  const { user } = useUser();
  const { msg, i, hourBetweenMessages, userMessageBurst, isLatest } = props;

  if (i !== 0 && hourBetweenMessages) {
    return (
      <>
        <li className="text-center">
          <MonthDayYearTime formatDate={msg.sentAt} />
        </li>
        <MessageBubble
          key={msg.id}
          message={msg}
          groupWithPrevioues={userMessageBurst}
          isLatest={isLatest}
          isMyMessage={msg.user.id === user.id}
        />
      </>
    );
  }

  return (
    <>
      <MessageBubble
        key={msg.id}
        message={msg}
        groupWithPrevioues={userMessageBurst}
        isLatest={isLatest}
        isMyMessage={msg.user.id === user.id}
      />
    </>
  );
}
