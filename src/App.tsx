import { ChevronLeft, MoreHorizontal, CheckCheck } from "lucide-react";

function App() {
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
        message: "Hey! Did you also go to Oxfor?",
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
    ],
  };

  return (
    <main className="p-2">
      <nav className="w-full">
        <ul className="flex items-center justify-between py-3">
          <li>
            <a>
              <ChevronLeft size={32} className="stroke-[#c4c9cf]" />
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
                size={32}
                className="fill-[#c4c9cf] stroke-[#c4c9cf] stroke-[3.5px]"
              />
            </a>
          </li>
        </ul>
        <ul className="bottom-shadow flex w-full items-center justify-between">
          <li className="w-full text-center">
            <button className="w-full border-b-4 border-[#dd5170] font-semibold  text-[#dd5170]">
              <p className="py-2">Chat</p>
            </button>
          </li>
          <li className="w-full text-center">
            <button className="w-full font-medium text-slate-400">
              <p className="py-2">Profile</p>
            </button>
          </li>
        </ul>
      </nav>
      <section className="h-[700px]">
        <ul className="relative flex h-full w-full flex-col justify-end gap-4">
          <p className="flex w-full items-center justify-center gap-1 text-center font-semibold">
            matched on
            <span>
              {data.match.matched.toDateString().split(" ")[1]}{" "}
              {data.match.matched.getDate()}, {data.match.matched.getFullYear()}{" "}
              {data.match.matched
                .toLocaleTimeString()
                .split(":")
                .slice(0, 2)
                .join(":")}
            </span>
          </p>
          {data.messages.map((msg) =>
            msg.user.id !== data.user.id ? (
              <li
                key={msg.id}
                className="flex w-full items-center justify-start"
              >
                <div className="leading-1.5 flex w-full max-w-[320px] flex-col gap-2.5 rounded-r-2xl rounded-tl-2xl  bg-[#e7e9f0] p-3 text-slate-700">
                  <p> {msg.message}</p>
                </div>
              </li>
            ) : (
              <li key={msg.id} className="flex w-full items-center justify-end">
                <div className="leading-1.5 flex w-full max-w-[320px] flex-col gap-2.5 rounded-l-2xl rounded-tr-2xl  bg-[#dd5170] p-3 text-neutral-50">
                  <p> {msg.message}</p>
                </div>
              </li>
            ),
          )}
        </ul>
        <div className="flex w-full items-center justify-center py-4">
          <form className="flex w-full items-center justify-center">
            <input
              placeholder={`Message ${data.match.name}`}
              className="w-full rounded-full border-[1.5px] border-slate-300 px-3 py-2"
            />
          </form>
        </div>
      </section>
    </main>
  );
}

export default App;
