import { useState } from "react"
import { Link } from "react-router-dom";

export default function Home() {

  const [username, setUsername] = useState();
  const [theme, setTheme] = useState();

  return (
    <div className="home">

      <label htmlFor="username">Nom d'utilisateur Twitch</label>
      <input type="text" id="username" onChange={(e) => setUsername(e.target.value)} />

      <label htmlFor="theme">Choisissez votre thème</label>
      <select id="theme" defaultValue={'default'} onChange={(e) => setTheme(e.target.value)}>
        <option value="default" disabled>Choisissez</option>
        <option value="Terminal">Terminal</option>
      </select>

      <Link to={`/chat?username=${username}&theme=${theme}`}>Créer mon chat</Link>

    </div>
  )

}
