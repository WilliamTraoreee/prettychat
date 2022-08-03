import { Message } from "../../types/Messages";

export default function BenAndBakMessage(props: { message: Message }) {
  const msg = props.message;

  return (
    <section className="container msg">
      <div className="name">{msg.username}</div>
      <div className="message" dangerouslySetInnerHTML={{ __html: msg.message }}></div>
    </section>
  );
}
