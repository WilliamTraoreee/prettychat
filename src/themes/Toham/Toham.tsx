import { Message } from "../../types/Messages";
import './Toham.scss';
import TohamMessage from "./TohamMessage";

export default function Toham(props: { messages: Message[] }) {

  const msgs = props.messages;

  return (
    <div className="chat theme-toham">
      {msgs.map((msg) => (
        <TohamMessage key={msg.id} message={msg} />
      ))}
    </div>
  )
}
