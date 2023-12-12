import { ChevronLeft, MoreHorizontal, CheckCheck } from "lucide-react";
import { useState } from "react";

enum ScreenView {
  Chat,
  Profile,
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
      return "border-b-4 border-[#dd5170] font-semibold  text-[#dd5170] w-full";
    } else {
      return "font-medium text-slate-400 w-full";
    }
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-neutral-50">
      <nav className="bottom-shadow h-[12%] w-full bg-neutral-50 drop-shadow-sm">
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
              <p className="py-2">Chat</p>
            </button>
          </li>
          <li className="w-full text-center">
            <button
              className={tabClass(ScreenView.Profile)}
              onClick={() => setScreenView(ScreenView.Profile)}
            >
              <p className="py-2">Profile</p>
            </button>
          </li>
        </ul>
      </nav>
      {screenView === ScreenView.Chat ? (
        <div className="flex h-[88%] w-full flex-col items-center justify-center bg-neutral-50">
          <div className="flex h-[89%] w-full flex-col justify-end gap-4 overflow-auto ">
            <ul className="flex h-full w-full flex-col gap-4 px-4">
              <li>
                <p className="flex w-full items-center justify-center gap-1 text-center font-semibold">
                  matched on
                  <span>
                    {data.match.matched.toDateString().split(" ")[1]}{" "}
                    {data.match.matched.getDate()},{" "}
                    {data.match.matched.getFullYear()}{" "}
                    {data.match.matched
                      .toLocaleTimeString()
                      .split(":")
                      .slice(0, 2)
                      .join(":")}
                  </span>
                </p>
              </li>
              {data.messages.map((msg) =>
                msg.user.id !== data.user.id ? (
                  <li
                    key={msg.id}
                    className="flex w-full items-center justify-start"
                  >
                    <div className="leading-1.5 flex w-full max-w-[320px] flex-col gap-2.5 rounded-r-2xl rounded-tl-2xl  bg-[#e7e9f0] p-3 text-slate-600">
                      <p> {msg.message}</p>
                    </div>
                  </li>
                ) : (
                  <li
                    key={msg.id}
                    className="flex w-full items-center justify-end"
                  >
                    <div className="leading-1.5 flex w-full max-w-[320px] flex-col gap-2.5 rounded-l-2xl rounded-tr-2xl  bg-[#dd5170] p-3 text-neutral-50">
                      <p> {msg.message}</p>
                    </div>
                  </li>
                ),
              )}
            </ul>
          </div>
          <div className="flex h-[10%] w-full items-center justify-center px-4 py-4">
            <form className="flex w-full items-center justify-center">
              <input
                placeholder={`Message ${data.match.name}`}
                className="w-full rounded-full border-[1.5px] border-slate-300 px-3 py-2"
              />
            </form>
          </div>
        </div>
      ) : (
        <div className="h-full">
          <p>Profile</p>
        </div>
      )}
    </main>
  );
}

export default App;
