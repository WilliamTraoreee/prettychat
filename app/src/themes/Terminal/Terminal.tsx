import { Message } from "../../types/Messages";
import "./Terminal.scss";
import TerminalMessage from "./TerminalMessage";

export default function Terminal(props: { messages: Message[] }) {
  const msgs = props.messages;

  return (
    <div className="chat theme-terminal">
      {msgs.map((msg) => (
        <TerminalMessage key={msg.id} message={msg} />
      ))}
      <div className="empty">
        <span className="chevron">{">"}</span>
        <span className="cursor"></span>
      </div>
    </div>
  );
}
