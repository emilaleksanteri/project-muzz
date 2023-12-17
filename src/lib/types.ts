export type Message = {
  message: string;
  id: number;
  user: { id: number; name: string };
  sentAt: Date;
  seenAt?: Date;
  img?: string;
  replyTo?: Message;
};

export type InfoKey =
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
export type User = {
  id: number;
  name: string;
  image: string;
  info: {
    bio: string;
    basicInfo: { key: InfoKey; value: string }[];
    religiosity: { key: InfoKey; value: string }[];
  };
};

export type Match = {
  id: number;
  matched: Date;
} & User;

export enum ScreenView {
  Chat,
  Profile,
}
