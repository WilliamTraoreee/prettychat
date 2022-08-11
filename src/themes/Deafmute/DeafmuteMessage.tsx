import { Message } from "../../types/Messages";

export default function DeafmuteMessage(props: { message: Message }) {
  const msg = props.message;

  return (
    <section className="container msg">
      <div className="box">
        <div className="name">
          {msg.username}
          <span className="close">X</span>
        </div>
        <div className="message" dangerouslySetInnerHTML={{ __html: msg.message }}></div>
      </div>
      <div className="box-copy">
        <div className="name">
          {msg.username}
          <span className="close">X</span>
        </div>
        <div className="message" dangerouslySetInnerHTML={{ __html: msg.message }}></div>
      </div>
    </section>
  );
}
