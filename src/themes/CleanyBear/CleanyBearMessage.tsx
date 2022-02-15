import { Message } from "../../types/Messages";

export default function CleanyBearMessage(props: { message: Message }) {
  const msg = props.message;

  return (
    <div
      className={`wrapper ${msg.badges?.vip ? "vip" : ""} ${msg.badges?.broadcaster ? "broadcaster" : ""} ${
        msg.badges?.moderator ? "moderator" : ""
      } ${msg.badges?.vip ? "verif" : ""}`}
    >
      <section className="container">
        <div className="message">
          <div className="message-content" dangerouslySetInnerHTML={{ __html: msg.message }} />
          <div className="user" style={{ backgroundColor: `${msg.color || "#000000"}30`, color: `${msg.color}` }}>
            {msg.username}
          </div>
        </div>
      </section>
    </div>
  );
}
