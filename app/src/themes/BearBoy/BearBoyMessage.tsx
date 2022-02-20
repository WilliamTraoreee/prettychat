import { Message } from "../../types/Messages";

export default function BearBoyMessage(props: { message: Message }) {
  const msg = props.message;

  return (
    <section className="container">
      <div
        className={`message-wrap ${msg.badges?.vip ? "vip" : ""} ${msg.badges?.broadcaster ? "broadcaster" : ""} ${
          msg.badges?.moderator ? "moderator" : ""
        } ${msg.badges?.vip ? "verif" : ""}`}
      >
        <div className="user">{msg.username}: </div>
        <div className="message" dangerouslySetInnerHTML={{ __html: msg.message }} />
      </div>
    </section>
  );
}
