import { useEffect, useState } from "react";
import Terminal from "../../themes/Terminal/Terminal";
import { EmoteOptions, parse } from "simple-tmi-emotes";
import tmi from "tmi.js";
import { useSearchParams } from "react-router-dom";
import { Message } from "../../types/Messages";
import Will from "../../themes/Will/Will";
import CleanyBear from "../../themes/CleanyBear/CleanyBear";
import BearBoy from "../../themes/BearBoy/BearBoy";
import Willv2 from "../../themes/Willv2/Willv2";
import Zyrophr from "../../themes/Zyrophr/Zyrophr";
import Toham from "../../themes/Toham/Toham";
import Willv3 from "../../themes/Willv3/Willv3";
import BenAndBak from "../../themes/BenAndBak/BenAndBak";
import Deafmute from "../../themes/Deafmute/Deafmute";
import Pxalafois from "../../themes/Pxalafois/Pxalafois";

export default function Chat() {
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const username: string | null = searchParams.get("username");
  const themeChoose: string | null = searchParams.get("theme");
  const client = new tmi.Client({ channels: [username || ""] });

  client.on("message", (_, tags, message) => {
    const options: EmoteOptions = {
      format: "default",
      themeMode: "light",
      scale: "2.0",
    };

    const msg: Message = {
      id: tags?.id,
      username: tags["display-name"],
      twitch: tags?.username,
      emotes: tags?.emotes || {},
      date: new Date(),
      message,
      badges: tags?.badges,
      mod: tags?.mod,
      subscriber: tags?.subscriber,
      color: tags?.color,
    };

    msg.message = parse(msg.message, msg.emotes, options);

    setMessages((oldMessages) => {
      if (oldMessages.length >= 50) oldMessages.shift();
      return [...oldMessages, msg];
    });
  });

  client.on("connected", () => {
    console.log("Je suis bien connecté");
  });

  client.on("messagedeleted", (_channel, _username, _deleteMessage, userstate) => {
    setMessages((msgs: Message[]) => {
      const msgId = userstate["target-msg-id"];
      const allMsgs = [...msgs];
      const cleanMsgs = allMsgs.filter((m) => m.id !== msgId);

      return cleanMsgs;
    });
  });

  client.on("ban", (_channel, username) => {
    setMessages((msgs) => {
      const allMsgs = [...msgs];
      const cleanMsgs = allMsgs.filter((m) => m.twitch !== username);

      return cleanMsgs;
    });
  });

  client.on("timeout", (_channel, username) => {
    setMessages((msgs) => {
      const allMsgs = [...msgs];
      const cleanMsgs = allMsgs.filter((m) => m.twitch !== username);

      return cleanMsgs;
    });
  });

  client.on("clearchat", () => setMessages([]));

  useEffect(() => {
    client.connect();
  }, []);

  switch (themeChoose) {
    case "Terminal":
      return <Terminal messages={messages} />;
    case "Will":
      return <Will messages={messages} />;
    case "CleanyBear":
      return <CleanyBear messages={messages} />;
    case "BearBoy":
      return <BearBoy messages={messages} />;
    case "Willv2":
      return <Willv2 messages={messages} />;
    case "Zyrophr":
      return <Zyrophr messages={messages} />;
    case "Toham":
      return <Toham messages={messages} />;
    case "Willv3":
      return <Willv3 messages={messages} />;
    case "BenAndBak":
      return <BenAndBak messages={messages} />;
    case "Deafmute":
      return <Deafmute messages={messages} />;
    case "Pxalafois":
        return <Pxalafois messages={messages} />;
    default:
      return <Terminal messages={messages} />;
  }
}
