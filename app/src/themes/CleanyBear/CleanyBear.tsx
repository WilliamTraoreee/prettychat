import { Message } from "../../types/Messages";
import CleanyBearMessage from "./CleanyBearMessage";
import "./CleanyBear.scss";

export default function CleanyBear(props: { messages: Message[] }) {
  const msgs = props.messages;

  return (
    <div className="chat theme-cleany-bear">
      {msgs.map((msg) => (
        <CleanyBearMessage key={msg.id} message={msg} />
      ))}
    </div>
  );
}
