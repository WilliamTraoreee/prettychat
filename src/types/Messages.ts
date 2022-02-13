import tmi from "tmi.js";

export interface Message {
  id: string | undefined;
  username: string | undefined;
  twitch: string | undefined;
  emotes: { [x: string]: string[]; [x: number]: string[] };
  date: Date;
  message: string;
  badges: tmi.Badges | undefined;
  mod: boolean | undefined;
  subscriber: boolean | undefined;
  color: string | undefined;
}
