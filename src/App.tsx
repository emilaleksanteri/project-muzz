import {
  ChevronLeft,
  MoreHorizontal,
  CheckCheck,
  SendHorizontal,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { type Message, type Match, type User, ScreenView } from "./lib/types";
import { useMessages } from "./lib/store";
import { Link } from "@tanstack/react-router";

function MessageListDate(props: { formatDate: Date }) {
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

function MatchText(props: { matchedOn: Date }) {
  return (
    <li className="w- full flex flex-col items-center justify-center">
      <MessageListDate formatDate={props.matchedOn} />
      <p className="pb-4 font-serif text-2xl font-bold text-slate-700">
        You matched 🎈
      </p>
    </li>
  );
}

function MatchTextBubble(props: {
  message: Message;
  isLatest: boolean;
  groupWithPrevioues: boolean;
}) {
  const { message } = props.message;
  const spacingFromBottom = props.isLatest ? "mb-[21%]" : "mb-0";
  const groupWithPrevious = props.groupWithPrevioues ? "-mt-3" : "mt-0";

  return (
    <li
      className={`flex w-full items-center justify-start ${spacingFromBottom} ${groupWithPrevious}`}
    >
      <div className="leading-1.5 flex w-full max-w-[320px] flex-col gap-2.5 rounded-r-2xl rounded-tl-2xl  bg-[#e7e9f0] p-3 text-slate-600">
        <p>{message}</p>
      </div>
    </li>
  );
}

function SenderTextBubble(props: {
  message: Message;
  isLatest: boolean;
  groupWithPrevioues: boolean;
}) {
  const { message } = props.message;
  const spacingFromBottom = props.isLatest ? "mb-[21%]" : "mb-0";
  const groupWithPrevious = props.groupWithPrevioues ? "-mt-3" : "mt-0";

  return (
    <li
      className={`flex w-full items-center justify-end ${spacingFromBottom} ${groupWithPrevious}`}
    >
      <div className="leading-1.5 flex w-full max-w-[320px] flex-col gap-2.5 rounded-l-2xl rounded-tr-2xl  bg-[#dd5170] p-3 text-neutral-50">
        <p>{message}</p>
      </div>
    </li>
  );
}

function Message(props: {
  msg: Message;
  i: number;
  hourBetweenMessages: boolean;
  userMessageBurst: boolean;
  isLatest: boolean;
  user: User;
}) {
  const { msg, i, hourBetweenMessages, userMessageBurst, isLatest, user } =
    props;
  if (i !== 0 && hourBetweenMessages) {
    return (
      <>
        <li className="text-center">
          <MessageListDate formatDate={msg.sentAt} />
        </li>
        {msg.user.id !== user.id ? (
          <MatchTextBubble
            key={msg.id}
            message={msg}
            groupWithPrevioues={userMessageBurst}
            isLatest={isLatest}
          />
        ) : (
          <SenderTextBubble
            key={msg.id}
            message={msg}
            groupWithPrevioues={userMessageBurst}
            isLatest={isLatest}
          />
        )}
      </>
    );
  }

  return (
    <>
      {msg.user.id !== user.id ? (
        <MatchTextBubble
          key={msg.id}
          message={msg}
          groupWithPrevioues={userMessageBurst}
          isLatest={isLatest}
        />
      ) : (
        <SenderTextBubble
          key={msg.id}
          message={msg}
          groupWithPrevioues={userMessageBurst}
          isLatest={isLatest}
        />
      )}
    </>
  );
}

function MessagesList(props: { match: Match; user: User }) {
  const { messages } = useMessages();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  function isHourBetweenMessages(
    message1: Message,
    message2: Message,
  ): boolean {
    return (
      message1.sentAt.getTime() - message2.sentAt.getTime() >= 1000 * 60 * 60
    );
  }

  function isUserMessageBurst(message1: Message, message2: Message): boolean {
    return (
      message1.user.id === message2.user.id &&
      message1.sentAt.getTime() - message2.sentAt.getTime() <= 1000 * 20
    );
  }

  return (
    <ul className="flex w-full flex-col gap-4 px-4 py-2">
      <MatchText matchedOn={props.match.matched} />
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
          user={props.user}
        />
      ))}
      <div ref={bottomRef} />
    </ul>
  );
}

type SendMessageProps = {
  matchName: string;
  user: User;
};

function SendMessage(props: SendMessageProps) {
  const [message, setMessage] = useState<string>("");
  const { matchName, user } = props;
  const { addMessage } = useMessages();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    resizeTextArea();
  }, [message]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addMessage({
      id: Math.floor(Math.random() * 100_000_000),
      message: message,
      sentAt: new Date(),
      user: user,
    });
    setMessage("");
  };

  return (
    <div className="absolute bottom-0 flex h-fit w-full items-center justify-center bg-white/30   px-4 py-4 backdrop-blur-xl">
      <form
        className="flex h-fit w-full items-center justify-center gap-2"
        onSubmit={onSubmit}
      >
        <textarea
          ref={textAreaRef}
          value={message}
          rows={1}
          id="text"
          autoFocus
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Message ${matchName}`}
          className={`scroll w-full ${
            message.length === 0 ? "rounded-full" : "rounded-lg"
          } resize-none overflow-auto border-[1.5px] border-slate-300 p-4 px-3 py-2 outline-none focus:outline-none`}
        />
        <button
          type="submit"
          className={`${
            message.length === 0 ? "hidden" : "block"
          } flex items-center justify-center self-end rounded-lg bg-[#dd5170] p-2 px-3`}
        >
          <SendHorizontal width={22} height={22} className="stroke-white " />
        </button>
      </form>
    </div>
  );
}

type MessageViewNavProps = {
  match: Match;
  setScreenView: React.Dispatch<React.SetStateAction<ScreenView>>;
  screenView: ScreenView;
};

type TabProps = {
  screenView: ScreenView;
  setScreenView: React.Dispatch<React.SetStateAction<ScreenView>>;
  children: string | JSX.Element;
  tabType: ScreenView;
};

function Tab(props: TabProps) {
  const { screenView, setScreenView, children, tabType } = props;

  const tabClass = (tab: ScreenView, currView: ScreenView) => {
    if (tab === currView) {
      return "border-[#dd5170] font-semibold  text-[#dd5170]";
    } else {
      return "font-medium text-slate-400";
    }
  };

  return (
    <div className="w-full text-center">
      <button
        className={`w-full border-b-[3px] ${tabClass(tabType, screenView)}`}
        onClick={() => setScreenView(tabType)}
      >
        <p className="py-1">{children}</p>
      </button>
    </div>
  );
}

function MessageViewNav(props: MessageViewNavProps) {
  const { match, setScreenView, screenView } = props;

  return (
    <nav className="h-fit w-full bg-neutral-50 ">
      <ul className="flex items-center justify-between px-2 py-3">
        <li>
          <Link className="-ml-1 flex w-fit items-center justify-center" to="/">
            <ChevronLeft size={40} className="stroke-[#c4c9cf]" />
          </Link>
        </li>
        <li>
          <div className="flex items-center justify-center gap-2 font-semibold text-slate-700">
            <div className="h-10 w-10 rounded-full border-[1.2px]">
              <img
                className="h-10 w-10 rounded-full bg-slate-300 object-cover"
                src={props.match.image}
              />
            </div>
            <p>{match.name}</p>
          </div>
        </li>
        <li className="pr-1">
          <a>
            <MoreHorizontal
              size={40}
              className="fill-[#c4c9cf] stroke-[#c4c9cf] stroke-[3.5px]"
            />
          </a>
        </li>
      </ul>
      <ul className="flex w-full items-center justify-between">
        <li className="w-full text-center">
          <Tab
            screenView={screenView}
            setScreenView={setScreenView}
            tabType={ScreenView.Chat}
          >
            Chat
          </Tab>
        </li>
        <li className="w-full text-center">
          <Tab
            screenView={screenView}
            setScreenView={setScreenView}
            tabType={ScreenView.Profile}
          >
            Profile
          </Tab>
        </li>
      </ul>
    </nav>
  );
}

export function Chat() {
  const [screenView, setScreenView] = useState<ScreenView>(ScreenView.Chat);
  const match: Match = {
    id: 1,
    name: "Alisha",
    matched: new Date("2023-12-13T12:20:36.461Z"),
    image:
      "https://res.cloudinary.com/duqbyobol/image/upload/v1702589450/amir-riazipour-XcZ78DlXtes-unsplash_kcke73.jpg",
  };

  const user: User = {
    id: 2,
    name: "User",
    image:
      "https://res.cloudinary.com/duqbyobol/image/upload/v1702589457/muhammad-ruqi-yaddin-hxLv1jqP0_o-unsplash_r7vqb6.jpg",
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-neutral-50">
      <MessageViewNav
        match={match}
        screenView={screenView}
        setScreenView={setScreenView}
      />
      {screenView === ScreenView.Chat ? (
        <div className="relative flex h-full w-full flex-col items-center justify-center ">
          <div className="absolute top-0 flex h-full w-full flex-col items-center justify-end bg-neutral-50">
            <div className="flex h-full w-full flex-col  gap-4 overflow-auto">
              <MessagesList match={match} user={user} />
            </div>
            <SendMessage matchName={match.name} user={user} />
          </div>
        </div>
      ) : (
        <div className="h-full py-10">
          <p>Profile</p>
        </div>
      )}
    </main>
  );
}

export function App() {
  return (
    <main>
      <p>Root</p>
      <Link to="chat">Chat</Link>
    </main>
  );
}
