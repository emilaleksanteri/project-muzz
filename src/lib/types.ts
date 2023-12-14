export type Message = {
  message: string;
  id: number;
  user: { id: number };
  sentAt: Date;
};

export type User = {
  id: number;
  name: string;
};

export type Match = {
  id: number;
  name: string;
  matched: Date;
};
