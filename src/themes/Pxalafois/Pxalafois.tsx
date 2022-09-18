import { Message } from "../../types/Messages";
import "./Pxalafois.scss";
import PxalafoisMessage from "./PxalafoisMessage";

export default function Pxalafois(props: { messages: Message[] }) {
  const msgs = props.messages;

  return (
    <div className="chat theme-pxalafois">
      {msgs.map((msg) => (
        <PxalafoisMessage key={msg.id} message={msg} />
      ))}
    </div>
  );
}
