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
      <nav className="w-full outline">
        <ul className="flex items-center justify-between py-3">
          <li>
            <a>back</a>
          </li>
          <li>
            <p>{data.match.name}</p>
          </li>
          <li>settings</li>
        </ul>
        <ul className="flex w-full items-center justify-between py-2 outline">
          <li className="w-full text-center">
            <button>Chat</button>
          </li>
          <li className="w-full text-center">
            <button>profile</button>
          </li>
        </ul>
      </nav>
      <section className="h-[700px] bg-zinc-200">
        <ul className="relative flex h-full w-full flex-col gap-4">
          <p className="flex items-center gap-1">
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
          {data.messages.map((msg) => (
            <li key={msg.id}>{msg.message}</li>
          ))}
        </ul>
        <div className="flex w-full items-center justify-center py-4">
          <form className="flex w-full items-center justify-center">
            <input
              placeholder={`Message ${data.match.name}`}
              className="w-full rounded-full border-[1.5px] border-zinc-400 px-3 py-2"
            />
          </form>
        </div>
      </section>
    </main>
  );
}

export default App;
