import { useEffect, useState } from "react";
import { useChat, useUser, user1, user2, useChats } from "../../../lib/store";
import { ScreenView } from "../../../lib/types";
import ChatNavBar from "../../../lib/components/chat/nav/ChatNavBar";
import MessagesList from "../../../lib/components/chat/MessageList";
import SendMessage from "../../../lib/components/chat/SendMessage";
import { useParams } from "@tanstack/react-router";

export function Chat(): JSX.Element {
  const [screenView, setScreenView] = useState<ScreenView>(ScreenView.Chat);
  const { match, setDemoMatch, setSeenNewMessages, messages } = useChat();
  const { user } = useUser();
  const { setMostRecentMessage } = useChats();
  const { chatId } = useParams({ strict: false });
  useEffect(() => {
    if (match.id === user.id) {
      const matchToSwitch = user.id === 1 ? user2 : user1;

      setDemoMatch({
        id: matchToSwitch.id,
        name: matchToSwitch.name,
        image: matchToSwitch.image,
        matched: match.matched,
      });
      setSeenNewMessages(user.id);
    }
    if (messages.length) {
      setMostRecentMessage(messages[messages.length - 1], Number(chatId));
    }
  }, [user, messages, match]);
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-neutral-50">
      <ChatNavBar
        match={match}
        screenView={screenView}
        setScreenView={setScreenView}
      />
      {screenView === ScreenView.Chat ? (
        <div className="relative flex h-full w-full flex-col items-center justify-center ">
          <div className="absolute top-0 flex h-full w-full flex-col items-center justify-end bg-neutral-50">
            <div className="flex h-full w-full flex-col  gap-4 overflow-auto">
              <MessagesList />
            </div>
            <SendMessage />
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
