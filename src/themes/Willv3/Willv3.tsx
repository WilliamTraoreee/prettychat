import { Message } from "../../types/Messages";
import Willv2Message from "./Willv3Message";

import "./Willv3.scss";

export default function Willv3(props: { messages: Message[] }) {
  const msgs = props.messages;

  return (
    <div className="chat theme-willv3">
      {msgs.map((msg) => (
        <Willv2Message key={msg.id} message={msg} />
      ))}
    </div>
  );
}
