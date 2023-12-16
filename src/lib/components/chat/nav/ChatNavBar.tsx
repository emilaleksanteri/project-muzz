import { type Match, ScreenView } from "../../../types";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, MoreHorizontal } from "lucide-react";
import Avatar from "../../atoms/Avatar";

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

function Tab(props: TabProps): JSX.Element {
  const { screenView, setScreenView, children, tabType } = props;

  const tabClass = (tab: ScreenView, currView: ScreenView) => {
    if (tab === currView) {
      return "border-[#dd5170] font-semibold  text-[#dd5170]";
    } else {
      return "font-medium text-slate-400";
    }
  };

  return (
    <div className="w-full text-center">
      <button
        className={`w-full border-b-[3px] ${tabClass(tabType, screenView)}`}
        onClick={() => setScreenView(tabType)}
      >
        <p className="py-1">{children}</p>
      </button>
    </div>
  );
}

export default function MessageViewNav(
  props: MessageViewNavProps,
): JSX.Element {
  const { match, setScreenView, screenView } = props;

  return (
    <nav className="h-fit w-full bg-neutral-50 ">
      <ul className="flex items-center justify-between px-2 py-3">
        <li>
          <Link className="-ml-1 flex w-fit items-center justify-center" to="/">
            <ChevronLeft size={40} className="stroke-[#c4c9cf]" />
          </Link>
        </li>
        <li>
          <div className="flex items-center justify-center gap-2 font-semibold text-slate-700">
            <Avatar src={match.image} alt={match.name} />
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
