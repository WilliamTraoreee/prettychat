import { Message } from "../../types/Messages";
import "./Zyrophr.scss";
import ZyrophrMessage from "./ZyrophrMessage";

export default function Willv2(props: { messages: Message[] }) {
  const msgs = props.messages;

  return (
    <div className="chat theme-zyrophr">
      {msgs.map((msg) => (
        <ZyrophrMessage key={msg.id} message={msg} />
      ))}
    </div>
  );
}
