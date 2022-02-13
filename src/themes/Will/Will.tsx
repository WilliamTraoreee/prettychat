import { Message } from "../../types/Messages";
import WillMessage from "./WillMessage";
import './Will.scss';

export default function Will(props: { messages: Message[] }) {

  const msgs = props.messages;

  return (
    <div className="chat theme-will">
      {msgs.map((msg) => (
        <WillMessage key={msg.id} message={msg} />
      ))}
    </div>
  )
}
