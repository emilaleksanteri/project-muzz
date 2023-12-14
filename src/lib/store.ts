import { create } from "zustand";
import type { Message } from "./types";

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

export interface IMessagesActions {
  addMessage: (message: Message) => void;
}

export const useMessages = create<IMessages & IMessagesActions>((set) => ({
  messages: messages,
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
}));
