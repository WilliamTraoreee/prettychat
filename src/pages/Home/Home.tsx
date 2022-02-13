import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Home.scss';
import Terminal from '../../themes/Terminal/Terminal'
import randomMessage from "../../utils/FakeChat";
import { Message } from "../../types/Messages";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [theme, setTheme] = useState<string>("Terminal");

  const [demo, setDemo] = useState<Message[]>([]);

  useEffect(() => {

    function pushMessage() {
      const randTiming = Math.floor(Math.random() * (3 - 6 + 1) + 3);
      setDemo((d) => {
        if (d.length >= 50) d.shift();
        return [...d, randomMessage()]
      });
      setTimeout(pushMessage, randTiming * 1000)
    }

    pushMessage()

  }, [])

  return (
    <div className="home">
      <label htmlFor="username">Nom d'utilisateur Twitch</label>
      <input
        type="text"
        id="username"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
      />

      <label htmlFor="theme">Choisissez votre thème</label>
      <select
        id="theme"
        defaultValue={"Terminal"}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTheme(e.target.value)}
      >
        <option value="Terminal">Terminal</option>
      </select>

      <Link to={`/chat?username=${username}&theme=${theme}`}>Créer mon chat</Link>

      <div className="demo">
        {theme === 'Terminal' && <Terminal messages={[...demo]}  />}
      </div>
    </div>
  );
}
