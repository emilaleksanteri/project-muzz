import { useEffect, useState } from "react";
import { useChat, useUser, user1, user2, useChats } from "../../../lib/store";
import { ScreenView } from "../../../lib/types";
import ChatNavBar from "../../../lib/components/chat/nav/ChatNavBar";
import MessagesList from "../../../lib/components/chat/MessageList";
import SendMessage from "../../../lib/components/chat/SendMessage";
import { useParams } from "@tanstack/react-router";
import {
  Ruler,
  Gem,
  Baby,
  Calendar,
  Plane,
  Moon,
  Speech,
  Utensils,
  Cigarette,
  Wine,
} from "lucide-react";

type InfoItemLabelProps = {
  identifier:
    | "height"
    | "hasBeenMarried"
    | "children"
    | "marriagePlans"
    | "locationPlan"
    | "religion"
    | "activity"
    | "prays"
    | "food"
    | "smokes"
    | "drinks";
  value: string;
};

function InfoItemLabel(props: InfoItemLabelProps): JSX.Element {
  const keyToIconMap = {
    height: <Ruler width={21} height={21} />,
    hasBeenMarried: <Gem width={21} height={21} />,
    children: <Baby width={21} height={21} />,
    marriagePlans: <Calendar width={21} height={21} />,
    locationPlan: <Plane width={21} height={21} />,
    religion: <Moon width={21} height={21} />,
    activity: <Moon width={21} height={21} />,
    prays: <Speech width={21} height={21} />,
    food: <Utensils width={21} height={21} />,
    smokes: <Cigarette width={21} height={21} />,
    drinks: <Wine width={21} height={21} />,
  };

  return (
    <li className="flex w-fit items-center gap-2 rounded-full bg-zinc-200 px-4 py-2 font-semibold ">
      {keyToIconMap[props.identifier]}
      <span className="text-slate-800">{props.value}</span>
    </li>
  );
}

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
        info: matchToSwitch.info,
        matched: match.matched,
      });
      setSeenNewMessages(user.id);
    }
    if (messages.length) {
      setMostRecentMessage(messages[messages.length - 1], Number(chatId));
    }
  }, [user, messages, match]);
  return (
    <main
      className={`flex ${
        screenView === ScreenView.Chat ? "h-screen" : "h-full xl:h-screen"
      } flex-col items-center justify-center bg-neutral-50`}
    >
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
        <div className="flex h-full w-full items-start justify-center">
          <section className="flex w-full flex-col items-stretch justify-center gap-4 px-6 py-10 lg:flex-row">
            <div className="w-full xl:w-[50%] 2xl:w-[40%]">
              <img
                src={match.image}
                alt={`${match.name} picture`}
                className=" h-80 w-80 rounded-lg object-cover"
              />
            </div>
            <div className="flex h-full w-fit flex-col gap-4">
              <h2 className="text-3xl font-bold text-slate-800">
                {match.name}
              </h2>
              <div>
                <p className="text-xl font-semibold text-slate-800">Bio</p>
                <p className="font-thin">{match.info.bio}</p>
              </div>
              <p className="text-xl font-semibold text-slate-800">Basic info</p>
              <ul className="flex flex-wrap items-center justify-start gap-2">
                {match.info.basicInfo.map((info) => (
                  <InfoItemLabel
                    key={info.key}
                    value={info.value}
                    identifier={info.key}
                  />
                ))}
              </ul>

              <p className="text-xl font-semibold text-slate-800">
                Religiosity
              </p>
              <ul className="flex flex-wrap items-center justify-start gap-2">
                {match.info.religiosity.map((info) => (
                  <InfoItemLabel
                    key={info.key}
                    value={info.value}
                    identifier={info.key}
                  />
                ))}
              </ul>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
