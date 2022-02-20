import { useEffect, useState } from "react";
import { Message } from "../../types/Messages";

export default function WillMessage(props: { message: Message }) {

  const msg = props.message;
  const [color, setColor] = useState<string>("");

  const colors = [
    '#2AB0EA',
    '#FF4141',
    '#F3C211',
    '#F9B0FF',
    '#9543F1'
  ];

  useEffect(() => {

    const random = colors[Math.floor(Math.random() * colors.length)];
    setColor(random);

  }, [])

  return (
    <section
      className={`${msg.badges?.vip ? "vip" : ""} ${msg.badges?.broadcaster ? "broadcaster" : ""} ${
        msg.badges?.moderator ? "moderator" : ""
      } ${msg.badges?.vip ? "verif" : ""} will-message`}
    >
      <div className="container-message-will">
        <p style={{backgroundColor: color}}>{msg.username}</p> 
        <div dangerouslySetInnerHTML={{ __html: msg.message }}></div>
      </div>
    </section>
  )
}
