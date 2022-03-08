import { Message } from "../../types/Messages";
import Willv2Message from "./Willv2Message";

import "./Willv2.scss";

export default function Willv2(props: { messages: Message[] }) {
  const msgs = props.messages;

  return (
    <div className="chat theme-willv2">
      {msgs.map((msg) => (
        <Willv2Message key={msg.id} message={msg} />
      ))}
    </div>
  );
}
