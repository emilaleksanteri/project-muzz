import { create } from "zustand";
import type { Match, Message, User } from "./types";

export const user1: User = {
  id: 1,
  name: "Alisha",
  image:
    "https://res.cloudinary.com/duqbyobol/image/upload/v1702589450/amir-riazipour-XcZ78DlXtes-unsplash_kcke73.jpg",
  info: {
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu consequat ac felis donec et. Laoreet id donec ultrices tincidunt arcu non.",
    basicInfo: [
      { key: "height", value: "183cm (6'0)" },
      { key: "hasBeenMarried", value: "Never married" },
      { key: "children", value: "No children" },
      { key: "marriagePlans", value: "Marriage within 1 - 2 years" },
      { key: "locationPlan", value: "Willing to relocate" },
    ],
    religiosity: [
      { key: "religion", value: "sunni" },
      { key: "activity", value: "practicing" },
      { key: "prays", value: "prays regularly" },
      { key: "food", value: "halal" },
      { key: "smokes", value: "non-smoker" },
      { key: "drinks", value: "non-drinker" },
    ],
  },
};

export const user2: User = {
  id: 2,
  name: "Afifa",
  image:
    "https://res.cloudinary.com/duqbyobol/image/upload/v1702589457/muhammad-ruqi-yaddin-hxLv1jqP0_o-unsplash_r7vqb6.jpg",
  info: {
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu consequat ac felis donec et. Laoreet id donec ultrices tincidunt arcu non.",
    basicInfo: [
      { key: "height", value: "173cm (5'6)" },
      { key: "hasBeenMarried", value: "Never married" },
      { key: "children", value: "No children" },
      { key: "marriagePlans", value: "Marriage within 1 - 2 years" },
      { key: "locationPlan", value: "Willing to relocate" },
    ],
    religiosity: [
      { key: "religion", value: "sunni" },
      { key: "activity", value: "practicing" },
      { key: "prays", value: "prays regularly" },
      { key: "food", value: "halal" },
      { key: "smokes", value: "non-smoker" },
      { key: "drinks", value: "non-drinker" },
    ],
  },
};

const messages: Message[] = [
  {
    message: "Hey! Did you also go to Oxford?",
    sentAt: new Date("2023-12-13T15:20:36.461Z"),
    seenAt: new Date("2023-12-13T15:20:36.461Z"),
    user: { id: 1, name: "Alisha" },
    id: 1,
  },
  {
    message: "Yes! Are you going to the food festival on Sunday?",
    sentAt: new Date("2023-12-13T15:23:36.461Z"),
    seenAt: new Date("2023-12-13T15:23:36.461Z"),
    user: { id: 2, name: "Afifa" },
    id: 2,
  },
  {
    message: "I am! See you there for a coffee?",
    sentAt: new Date("2023-12-13T15:25:36.461Z"),
    seenAt: new Date("2023-12-13T15:25:36.461Z"),
    user: { id: 1, name: "Alisha" },
    id: 3,
  },
  {
    message: "Hey! Did you also go to Oxford?",
    sentAt: new Date("2023-12-13T15:25:40.461Z"),
    seenAt: new Date("2023-12-13T15:25:40.461Z"),
    user: { id: 1, name: "Alisha" },
    id: 4,
  },
  {
    message: "Yes! Are you going to the food festival on Sunday?",
    sentAt: new Date("2023-12-13T15:26:45.461Z"),
    seenAt: new Date("2023-12-13T15:26:45.461Z"),
    user: { id: 2, name: "Afifa" },
    id: 5,
  },
  {
    message: "I am! See you there for a coffee?",
    sentAt: new Date("2023-12-13T15:28:00.461Z"),
    seenAt: new Date("2023-12-13T15:28:00.461Z"),
    user: { id: 1, name: "Alisha" },
    id: 6,
  },
  {
    message: "Hey! Did you also go to Oxford?",
    sentAt: new Date("2023-12-13T15:28:10.461Z"),
    seenAt: new Date("2023-12-13T15:28:10.461Z"),
    user: { id: 1, name: "Alisha" },
    id: 7,
  },
  {
    message: "Yes! Are you going to the food festival on Sunday?",
    sentAt: new Date("2023-12-13T15:29:20.461Z"),
    seenAt: new Date("2023-12-13T15:29:20.461Z"),
    user: { id: 2, name: "Afifa" },
    id: 8,
  },
  {
    message: "I am! See you there for a coffee?",
    sentAt: new Date("2023-12-13T16:30:20.461Z"),
    seenAt: new Date("2023-12-13T16:30:20.461Z"),
    user: { id: 1, name: "Alisha" },
    id: 9,
  },

  {
    message: "Hey! Did you also go to Oxford?",
    sentAt: new Date("2023-12-13T16:32:20.461Z"),
    seenAt: new Date("2023-12-13T16:32:20.461Z"),
    user: { id: 1, name: "Alisha" },
    id: 10,
  },
  {
    message: "Yes! Are you going to the food festival on Sunday?",
    sentAt: new Date("2023-12-13T16:32:45.461Z"),
    seenAt: new Date("2023-12-13T16:32:45.461Z"),
    user: { id: 2, name: "Afifa" },
    id: 11,
  },
  {
    message: "I am! See you there for a coffee?",
    sentAt: new Date("2023-12-13T18:32:45.461Z"),
    seenAt: new Date("2023-12-13T18:34:45.461Z"),
    user: { id: 1, name: "Alisha" },
    id: 12,
  },
];

export interface IMessages {
  messages: Message[];
}

export interface IChat {
  messages: Message[];
  match: Match;
}

export interface IChatActions {
  addMessage: (message: Message) => void;
  setDemoMatch: (match: Match) => void;
  setSeenNewMessages: (userId: number) => void;
}

function setNotSennToSeen(messages: Message[], userId: number): Message[] {
  const walkToLastUnseenMsg = () => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].user.id !== userId && messages[i].seenAt) {
        return i;
      }
    }
    return -1;
  };

  const lastUnseenMsgIndex = walkToLastUnseenMsg();
  if (lastUnseenMsgIndex === -1 || lastUnseenMsgIndex === messages.length - 1) {
    return messages;
  }

  const unseenOnes = messages.slice(lastUnseenMsgIndex, messages.length);
  return messages.slice(0, lastUnseenMsgIndex).concat(
    unseenOnes.map((msg) => {
      if (msg.user.id !== userId) {
        return {
          ...msg,
          seenAt: new Date(),
        };
      } else {
        return msg;
      }
    }),
  );
}

export const useChat = create<IChat & IChatActions>((set) => ({
  messages: messages,
  match: {
    ...user1,
    matched: new Date("2023-12-13T12:20:36.461Z"),
  },
  addMessage: (message) =>
    set((state) => ({
      match: state.match,
      messages: [...state.messages, message],
    })),

  setDemoMatch: (match) =>
    set((state) => ({
      match: match,
      messages: state.messages,
    })),

  setSeenNewMessages: (userId) =>
    set((state) => ({
      match: state.match,
      messages: setNotSennToSeen(state.messages, userId),
    })),
}));

const chats = [
  {
    id: 1,
    match: {
      ...user1,
      matched: new Date("2023-12-13T12:20:36.461Z"),
    },
    mostRecentMessage: {
      message: "I am! See you there for a coffee?",
      sentAt: new Date("2023-12-13T18:32:45.461Z"),
      user: { id: 1, name: "Alisha" },
      id: 12,
    },
  },
];

export interface IChats {
  chats: {
    id: number;
    match: Match;
    mostRecentMessage?: Message;
  }[];
}

export interface IChatsActions {
  setDemoChatMatch: (match: Match, chatId: number) => void;
  setMostRecentMessage: (message: Message, chatId: number) => void;
}

export const useChats = create<IChats & IChatsActions>((set) => ({
  chats: chats,
  setDemoChatMatch: (match, chatId) => {
    set((state) => ({
      chats: state.chats.map((chat) => {
        if (chat.id === chatId) {
          return {
            id: chat.id,
            match: match,
            mostRecentMessage: chat.mostRecentMessage,
          };
        } else {
          return chat;
        }
      }),
    }));
  },
  setMostRecentMessage: (message, chatId) => {
    set((state) => ({
      chats: state.chats.map((chat) => {
        if (chat.id === chatId) {
          return {
            id: chat.id,
            match: chat.match,
            mostRecentMessage: message,
          };
        } else {
          return chat;
        }
      }),
    }));
  },
}));

export interface IUser {
  user: User;
}

export interface IUserActions {
  setUser: (user: User) => void;
}

export const useUser = create<IUser & IUserActions>((set) => ({
  user: user2,
  setUser: (user) =>
    set(() => ({
      user: user,
    })),
}));
