import { create } from "zustand";
import type { Match, Message, User } from "./types";

const messages = [
  {
    message: "Hey! Did you also go to Oxford?",
    sentAt: new Date("2023-12-13T15:20:36.461Z"),
    user: { id: 1 },
    id: 1,
  },
  {
    message: "Yes! Are you going to the food festival on Sunday?",
    sentAt: new Date("2023-12-13T15:23:36.461Z"),
    user: { id: 2 },
    id: 2,
  },
  {
    message: "I am! See you there for a coffee?",
    sentAt: new Date("2023-12-13T15:25:36.461Z"),
    user: { id: 1 },
    id: 3,
  },
  {
    message: "Hey! Did you also go to Oxford?",
    sentAt: new Date("2023-12-13T15:25:40.461Z"),
    user: { id: 1 },
    id: 4,
  },
  {
    message: "Yes! Are you going to the food festival on Sunday?",
    sentAt: new Date("2023-12-13T15:26:45.461Z"),
    user: { id: 2 },
    id: 5,
  },
  {
    message: "I am! See you there for a coffee?",
    sentAt: new Date("2023-12-13T15:28:00.461Z"),
    user: { id: 1 },
    id: 6,
  },
  {
    message: "Hey! Did you also go to Oxford?",
    sentAt: new Date("2023-12-13T15:28:10.461Z"),
    user: { id: 1 },
    id: 7,
  },
  {
    message: "Yes! Are you going to the food festival on Sunday?",
    sentAt: new Date("2023-12-13T15:29:20.461Z"),
    user: { id: 2 },
    id: 8,
  },
  {
    message: "I am! See you there for a coffee?",
    sentAt: new Date("2023-12-13T16:30:20.461Z"),
    user: { id: 1 },
    id: 9,
  },

  {
    message: "Hey! Did you also go to Oxford?",
    sentAt: new Date("2023-12-13T16:32:20.461Z"),
    user: { id: 1 },
    id: 10,
  },
  {
    message: "Yes! Are you going to the food festival on Sunday?",
    sentAt: new Date("2023-12-13T16:32:45.461Z"),
    user: { id: 2 },
    id: 11,
  },
  {
    message: "I am! See you there for a coffee?",
    sentAt: new Date("2023-12-13T18:32:45.461Z"),
    user: { id: 1 },
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
}

export const useChat = create<IChat & IChatActions>((set) => ({
  messages: messages,
  match: {
    id: 1,
    name: "Alisha",
    matched: new Date("2023-12-13T12:20:36.461Z"),
    image:
      "https://res.cloudinary.com/duqbyobol/image/upload/v1702589450/amir-riazipour-XcZ78DlXtes-unsplash_kcke73.jpg",
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
}));

const chats = [
  {
    id: 1,
    match: {
      id: 1,
      name: "Alisha",
      matched: new Date("2023-12-13T12:20:36.461Z"),
      image:
        "https://res.cloudinary.com/duqbyobol/image/upload/v1702589450/amir-riazipour-XcZ78DlXtes-unsplash_kcke73.jpg",
    },
  },
];

export interface IChats {
  chats: {
    id: number;
    match: Match;
  }[];
}

export interface IChatsActions {
  setDemoChatMatch: (match: Match, chatId: number) => void;
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
          };
        } else {
          return chat;
        }
      }),
    }));
  },
}));

export const user1 = {
  id: 1,
  name: "Alisha",
  image:
    "https://res.cloudinary.com/duqbyobol/image/upload/v1702589450/amir-riazipour-XcZ78DlXtes-unsplash_kcke73.jpg",
};

export const user2 = {
  id: 2,
  name: "User",
  image:
    "https://res.cloudinary.com/duqbyobol/image/upload/v1702589457/muhammad-ruqi-yaddin-hxLv1jqP0_o-unsplash_r7vqb6.jpg",
};

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
