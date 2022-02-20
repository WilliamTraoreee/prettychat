import { Message } from "../../types/Messages";
import BearBoyMessage from "./BearBoyMessage";
import "./BearBoy.scss";

export default function BearBoy(props: { messages: Message[] }) {
  const msgs = props.messages;

  return (
    <div className="chat theme-bear-boy">
      {msgs.map((msg) => (
        <BearBoyMessage key={msg.id} message={msg} />
      ))}
    </div>
  );
}
