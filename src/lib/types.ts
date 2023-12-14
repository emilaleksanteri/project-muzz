export type Message = {
  message: string;
  id: number;
  user: { id: number };
  sentAt: Date;
};

export type User = {
  id: number;
  name: string;
  image: string;
};

export type Match = {
  id: number;
  name: string;
  matched: Date;
  image: string;
};

export enum ScreenView {
  Chat,
  Profile,
}
