import { Message } from "../../types/Messages";
import DeafmuteMessage from "./DeafmuteMessage";

import "./Deafmute.scss";

export default function Deafmute(props: { messages: Message[] }) {
  const msgs = props.messages;

  return (
    <div className="chat theme-deafmute">
      {msgs.map((msg) => (
        <DeafmuteMessage key={msg.id} message={msg} />
      ))}
    </div>
  );
}
