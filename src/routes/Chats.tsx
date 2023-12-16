import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useChats, useUser, user1, user2 } from "../lib/store";
import Avatar from "../lib/components/atoms/Avatar";

export function Chats(): JSX.Element {
  const { chats, setDemoChatMatch } = useChats();
  const { user, setUser } = useUser();

  const userToSwitch =
    user.id === 1
      ? { name: user2.name, user: user2 }
      : { name: user1.name, user: user1 };

  useEffect(() => {
    if (chats.length) {
      const chatToSwitch = chats.find((chat) => chat.match.id === user.id);
      if (chatToSwitch) {
        setDemoChatMatch(
          {
            id: userToSwitch.user.id,
            name: userToSwitch.user.name,
            image: userToSwitch.user.image,
            matched: chatToSwitch.match.matched,
          },
          chatToSwitch.id,
        );
      }
    }
  }, [user]);

  const formatDate = (date: Date): string => {
    const today = new Date();
    if (date.getDate() === today.getDate()) {
      return date.toLocaleTimeString("EN-us", { timeStyle: "short" });
    } else if (date.getDate() === today.getDate() - 1) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <main className="h-screen">
      <div className="flex items-center justify-between">
        <p>Current user: {user.name}</p>
        <button onClick={() => setUser(userToSwitch.user)}>
          switch to {userToSwitch.name}
        </button>
      </div>
      <section className="flex flex-col gap-2 px-4">
        <h2 className="py-4 text-xl font-semibold text-slate-800">Messages</h2>
        <ul>
          {chats.map((chat) => (
            <li key={chat.match.name}>
              <Link
                to="/chat/$chatId"
                params={{ chatId: String(chat.id) }}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-3">
                  <Avatar
                    src={chat.match.image}
                    alt={chat.match.name}
                    imageClass="w-12 h-12"
                    contnainerClass="w-12 h-12 border-none"
                  />
                  <div className="flex flex-col items-start justify-center">
                    <p className="text-lg font-semibold text-slate-700">
                      {chat.match.name}
                    </p>
                    <p className="text-sm font-thin">
                      {chat.mostRecentMessage
                        ? chat.mostRecentMessage.message
                        : "New match 🎈"}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-thin">
                  {chat.mostRecentMessage
                    ? formatDate(chat.mostRecentMessage?.sentAt)
                    : ""}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
