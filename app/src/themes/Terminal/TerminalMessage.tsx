import { Message } from "../../types/Messages";

export default function TerminalMessage(props: { message: Message }) {
  const msg = props.message;

  return (
    <section
      className={`${msg.badges?.vip ? "vip" : ""} ${msg.badges?.broadcaster ? "broadcaster" : ""} ${
        msg.badges?.moderator ? "moderator" : ""
      } ${msg.badges?.vip ? "verif" : ""} terminal-message`}
    >
      <strong>{msg.username}</strong> <p dangerouslySetInnerHTML={{ __html: msg.message }}></p>
    </section>
  );
}
