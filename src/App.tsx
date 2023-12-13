import { ChevronLeft, MoreHorizontal, CheckCheck } from "lucide-react";
import { useState } from "react";

enum ScreenView {
  Chat,
  Profile,
}

function MatchDate(props: { formatDate: Date }) {
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
      <MatchDate formatDate={props.matchedOn} />
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

function MatchTextBubble(props: { message: Message, isLatest: boolean }) {
  const { message } = props.message;
  const spacingFromBottom = props.isLatest ? "mb-[21%]" : "mb-0";

  return (
    <li className={`flex w-full items-center justify-start ${spacingFromBottom}`}>
      <div className="leading-1.5 flex w-full max-w-[320px] flex-col gap-2.5 rounded-r-2xl rounded-tl-2xl  bg-[#e7e9f0] p-3 text-slate-600">
        <p>{message}</p>
      </div>
    </li>
  );
}

function SenderTextBubble(props: { message: Message, isLatest: boolean }) {
  const { message } = props.message;
  const spacingFromBottom = props.isLatest ? "mb-[21%]" : "mb-0";

  return (
    <li className={`flex w-full items-center justify-end ${spacingFromBottom}`}>
      <div className="leading-1.5 flex w-full max-w-[320px] flex-col gap-2.5 rounded-l-2xl rounded-tr-2xl  bg-[#dd5170] p-3 text-neutral-50">
        <p>{message}</p>
      </div>
    </li>
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
  return (
    <ul className="flex w-full flex-col gap-4 px-4 py-2">
      <MatchText matchedOn={props.match.matched} />
      {props.messages.map((msg, i) =>
        msg.user.id !== props.user.id ? (
          <MatchTextBubble message={msg} key={msg.id} isLatest={i === props.messages.length - 1} />
        ) : (
          <SenderTextBubble message={msg} key={msg.id} isLatest={i === props.messages.length - 1} />
        ),
      )}
    </ul>
  );
}

function App() {
  const [screenView, setScreenView] = useState<ScreenView>(ScreenView.Chat);
  const data = {
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
        sentAt: new Date(),
        user: { id: 1 },
        id: 1,
      },
      {
        message: "Yes! Are you going to the food festival on Sunday?",
        sentAt: new Date(),
        user: { id: 2 },
        id: 2,
      },
      {
        message: "I am! See you there for a coffee?",
        sentAt: new Date(),
        user: { id: 1 },
        id: 3,
      },
      {
        message: "Hey! Did you also go to Oxford?",
        sentAt: new Date(),
        user: { id: 1 },
        id: 4,
      },
      {
        message: "Yes! Are you going to the food festival on Sunday?",
        sentAt: new Date(),
        user: { id: 2 },
        id: 5,
      },
      {
        message: "I am! See you there for a coffee?",
        sentAt: new Date(),
        user: { id: 1 },
        id: 6,
      },
      {
        message: "Hey! Did you also go to Oxford?",
        sentAt: new Date(),
        user: { id: 1 },
        id: 7,
      },
      {
        message: "Yes! Are you going to the food festival on Sunday?",
        sentAt: new Date(),
        user: { id: 2 },
        id: 8,
      },
      {
        message: "I am! See you there for a coffee?",
        sentAt: new Date(),
        user: { id: 1 },
        id: 9,
      },

      {
        message: "Hey! Did you also go to Oxford?",
        sentAt: new Date(),
        user: { id: 1 },
        id: 10,
      },
      {
        message: "Yes! Are you going to the food festival on Sunday?",
        sentAt: new Date(),
        user: { id: 2 },
        id: 11,
      },
      {
        message: "I am! See you there for a coffee?",
        sentAt: new Date(),
        user: { id: 1 },
        id: 12,
      },
    ],
  };

  const tabClass = (tab: ScreenView) => {
    if (tab === screenView) {
      return "border-b-[3px] border-[#dd5170] font-semibold  text-[#dd5170] w-full";
    } else {
      return "font-medium text-slate-400 w-full border-b-[3px]";
    }
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-neutral-50">
      <nav className="bottom-shadow h-fit w-full bg-neutral-50 ">
        <ul className="flex items-center justify-between px-2 py-3">
          <li>
            <a className="-ml-1 flex w-fit items-center justify-center">
              <ChevronLeft size={40} className="stroke-[#c4c9cf]" />
            </a>
          </li>
          <li>
            <div className="flex items-center justify-center gap-2 font-semibold text-slate-700">
              <img className="h-8 w-8 rounded-full bg-slate-300" />
              <p>{data.match.name}</p>
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
            <button
              className={tabClass(ScreenView.Chat)}
              onClick={() => setScreenView(ScreenView.Chat)}
            >
              <p className="py-1">Chat</p>
            </button>
          </li>
          <li className="w-full text-center">
            <button
              className={tabClass(ScreenView.Profile)}
              onClick={() => setScreenView(ScreenView.Profile)}
            >
              <p className="py-1">Profile</p>
            </button>
          </li>
        </ul>
      </nav>
      {screenView === ScreenView.Chat ? (
        <div className="h-full w-full flex flex-col items-center justify-center relative ">
          <div className="absolute top-0 flex h-full w-full flex-col items-center justify-end bg-neutral-50">
            <div className="flex h-full w-full flex-col  gap-4 overflow-auto">
              <MessagesList
                messages={data.messages}
                match={data.match}
                user={data.user}
              />
            </div>
            <div className="absolute bottom-0 flex h-[10%] bg-white/30 w-full items-center justify-center  border-t-[1.8px] border-slate-200 px-4 py-4 backdrop-blur-xl">
              <form className="flex w-full items-center justify-center">
                <input
                  placeholder={`Message ${data.match.name}`}
                  className="w-full rounded-full border-[1.5px] border-slate-300 px-3 py-2"
                />
              </form>

            </div>
          </div>
        </div>
      ) : (
        <div className="h-[88%]">
          <p>Profile</p>
        </div>
      )}
    </main>
  );
}

export default App;
