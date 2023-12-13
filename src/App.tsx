import { ChevronLeft, MoreHorizontal, CheckCheck } from "lucide-react";
import { useState } from "react";

enum ScreenView {
  Chat,
  Profile,
}

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

type Message = {
  message: string;
  id: number;
  user: { id: number };
  sentAt: Date;
};

type Match = {
  id: number;
  name: string;
  matched: Date;
};

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

type User = {
  id: number;
};

function MessagesList(props: {
  messages: Message[];
  match: Match;
  user: User;
}) {
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
      message1.sentAt.getTime() - message2.sentAt.getTime() <= 1000 * 60 * 20
    );
  }

  return (
    <ul className="flex w-full flex-col gap-4 px-4 py-2">
      <MatchText matchedOn={props.match.matched} />
      {props.messages.map((msg, i) => (
        <Message
          msg={msg}
          i={i}
          hourBetweenMessages={
            i !== 0 && isHourBetweenMessages(msg, props.messages[i - 1])
          }
          userMessageBurst={
            i !== 0 && isUserMessageBurst(msg, props.messages[i - 1])
          }
          isLatest={i === props.messages.length - 1}
          user={props.user}
        />
      ))}
    </ul>
  );
}

function SendMessage(props: { matchName: string }) {
  return (
    <div className="absolute bottom-0 flex h-[10%] w-full items-center justify-center bg-white/30   px-4 py-4 backdrop-blur-xl">
      <form className="flex w-full items-center justify-center">
        <input
          placeholder={`Message ${props.matchName}`}
          className="w-full rounded-full border-[1.5px] border-slate-300 px-3 py-2"
        />
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
      return "border-b-[3px] border-[#dd5170] font-semibold  text-[#dd5170] w-full";
    } else {
      return "border-b-[3px] font-medium text-slate-400 w-full ";
    }
  };

  return (
    <li className="w-full text-center">
      <button
        className={tabClass(tabType, screenView)}
        onClick={() => setScreenView(tabType)}
      >
        <p className="py-1">{children}</p>
      </button>
    </li>
  );
}

function MessageViewNav(props: MessageViewNavProps) {
  const { match, setScreenView, screenView } = props;

  return (
    <nav className="h-fit w-full bg-neutral-50 ">
      <ul className="flex items-center justify-between px-2 py-3">
        <li>
          <a className="-ml-1 flex w-fit items-center justify-center">
            <ChevronLeft size={40} className="stroke-[#c4c9cf]" />
          </a>
        </li>
        <li>
          <div className="flex items-center justify-center gap-2 font-semibold text-slate-700">
            <img className="h-8 w-8 rounded-full bg-slate-300" />
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

function App() {
  const [screenView, setScreenView] = useState<ScreenView>(ScreenView.Chat);
  const [data, _setData] = useState({
    match: {
      id: 1,
      name: "Alisha",
      matched: new Date(),
    },
    user: {
      id: 2,
      name: "User",
    },
    messages: [
      {
        message: "Hey! Did you also go to Oxford?",
        sentAt: new Date("2023-12-13T15:20:36.461Z"),
        user: { id: 1 },
        id: 1,
      },
      {
        message: "Yes! Are you going to the food festival on Sunday?",
        sentAt: new Date("2023-12-13T15:23:36.461Z"),
        user: { id: 2 },
        id: 2,
      },
      {
        message: "I am! See you there for a coffee?",
        sentAt: new Date("2023-12-13T15:25:36.461Z"),
        user: { id: 1 },
        id: 3,
      },
      {
        message: "Hey! Did you also go to Oxford?",
        sentAt: new Date("2023-12-13T15:25:40.461Z"),
        user: { id: 1 },
        id: 4,
      },
      {
        message: "Yes! Are you going to the food festival on Sunday?",
        sentAt: new Date("2023-12-13T15:26:45.461Z"),
        user: { id: 2 },
        id: 5,
      },
      {
        message: "I am! See you there for a coffee?",
        sentAt: new Date("2023-12-13T15:28:00.461Z"),
        user: { id: 1 },
        id: 6,
      },
      {
        message: "Hey! Did you also go to Oxford?",
        sentAt: new Date("2023-12-13T15:28:10.461Z"),
        user: { id: 1 },
        id: 7,
      },
      {
        message: "Yes! Are you going to the food festival on Sunday?",
        sentAt: new Date("2023-12-13T15:29:20.461Z"),
        user: { id: 2 },
        id: 8,
      },
      {
        message: "I am! See you there for a coffee?",
        sentAt: new Date("2023-12-13T16:30:20.461Z"),
        user: { id: 1 },
        id: 9,
      },

      {
        message: "Hey! Did you also go to Oxford?",
        sentAt: new Date("2023-12-13T16:32:20.461Z"),
        user: { id: 1 },
        id: 10,
      },
      {
        message: "Yes! Are you going to the food festival on Sunday?",
        sentAt: new Date("2023-12-13T16:32:45.461Z"),
        user: { id: 2 },
        id: 11,
      },
      {
        message: "I am! See you there for a coffee?",
        sentAt: new Date("2023-12-13T18:32:45.461Z"),
        user: { id: 1 },
        id: 12,
      },
    ],
  });

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-neutral-50">
      <MessageViewNav
        match={data.match}
        screenView={screenView}
        setScreenView={setScreenView}
      />
      {screenView === ScreenView.Chat ? (
        <div className="relative flex h-full w-full flex-col items-center justify-center ">
          <div className="absolute top-0 flex h-full w-full flex-col items-center justify-end bg-neutral-50">
            <div className="flex h-full w-full flex-col  gap-4 overflow-auto">
              <MessagesList
                messages={data.messages}
                match={data.match}
                user={data.user}
              />
            </div>
            <SendMessage matchName={data.match.name} />
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

export default App;
