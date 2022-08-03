import { Message } from "../../types/Messages";
import "./BenAndBak.scss";
import BenAndBakMessage from "./BenAndBakMessage";

export default function BenAndBack(props: { messages: Message[] }) {
  const msgs = props.messages;

  return (
    <div className="chat theme-benandback">
      {msgs.map((msg) => (
        <BenAndBakMessage key={msg.id} message={msg} />
      ))}
    </div>
  );
}
