import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useChats, useUser, user1, user2 } from "../lib/store";

export function Chats(): JSX.Element {
  const { chats, setDemoChatMatch } = useChats();
  const { user, setUser } = useUser();

  const userToSwitch =
    user.id === 1
      ? { name: user2.name, user: user2 }
      : { name: user1.name, user: user1 };

  useEffect(() => {
    if (chats.length > 0) {
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

  return (
    <main>
      <div>
        <p>Current user: {user.name}</p>
        <button onClick={() => setUser(userToSwitch.user)}>
          switch to {userToSwitch.name}
        </button>
      </div>
      {chats.map((chat) => (
        <Link
          to="/chat/$chatId"
          params={{ chatId: String(chat.id) }}
          key={chat.match.name}
        >
          <p>{chat.match.name}</p>
        </Link>
      ))}
    </main>
  );
}
