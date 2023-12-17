import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useChats, useUser, user1, user2 } from "../lib/store";
import Avatar from "../lib/components/atoms/Avatar";
import { RefreshCw } from "lucide-react";
import type { IChats } from "../lib/store";

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

function ChatRow(props: {
  chat: IChats["chats"][0];
  userId: number;
}): JSX.Element {
  const { chat, userId } = props;

  const slicedRecent = (recent: string) => {
    if (recent.length > 30) {
      return recent.slice(0, 30) + "...";
    }

    return recent;
  };

  return (
    <li>
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
            <p
              className={`
              ${
                chat.mostRecentMessage?.user.id !== userId &&
                chat.mostRecentMessage?.seenAt === undefined
                  ? "font-semibold"
                  : "font-thin"
              } 
                text-sm`}
            >
              {chat.mostRecentMessage && chat.mostRecentMessage.message !== " "
                ? slicedRecent(chat.mostRecentMessage.message)
                : chat.mostRecentMessage?.img
                  ? `${
                      chat.mostRecentMessage.user.id === userId
                        ? "You"
                        : chat.mostRecentMessage.user.name
                    } sent a photo 📷`
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
  );
}

export function Chats(): JSX.Element {
  const [spinMe, setSpinMe] = useState<boolean>(false);
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

  const switchUser = () => {
    setSpinMe(true);
    setTimeout(() => {
      setSpinMe(false);
    }, 600);

    setUser(userToSwitch.user);
  };

  return (
    <main className="h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 px-4 py-2 text-lg font-bold">
          <Avatar
            src={user.image}
            alt={user.name}
            imageClass="w-10 h-10"
            contnainerClass="w-10 h-10 border-none"
          />
          <p>{user.name}</p>
        </div>
        <button
          onClick={switchUser}
          className={`px-4 py-2 ${spinMe ? "animate-spin-once" : ""}`}
        >
          <RefreshCw size={28} className="stroke-slate-800" />
        </button>
      </div>
      <section className="flex flex-col gap-2 px-4">
        <h2 className="py-4 text-xl font-semibold text-slate-800">Messages</h2>
        <ul>
          {chats.map((chat) => (
            <ChatRow key={chat.id} chat={chat} userId={user.id} />
          ))}
        </ul>
      </section>
    </main>
  );
}
