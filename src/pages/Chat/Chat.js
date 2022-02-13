import { useEffect } from "react";
import { useSearchParams } from "react-router-dom"
import { useState } from "react/cjs/react.development";
import tmi from 'tmi.js';
import { parse } from 'simple-tmi-emotes';
import Terminal from '../../themes/Terminal/Terminal';


export default function Chat() {

  let [searchParams, setSearchParams] = useSearchParams();
  const [messages, setMessages] = useState([]);

  const username = searchParams.get('username');
  const themeChoose = searchParams.get('theme');

  const client = new tmi.Client({
    channels: [ username ]
  });

  useEffect(() => {
    client.connect();

    client.on('connected', () => {
      console.log('Je suis bien connecté')
    })

    client.on('message', (channel, tags, message, self) => {
  
      const msg = {
        id: tags?.id,
        username: tags['display-name'],
        twitch: tags?.username,
        emotes: tags?.emotes || [],
        date: new Date(),
        message,
        badges: tags?.badges,
        mod: tags?.mod,
        subscriber: tags?.subscriber,
        color: tags?.color
      }
  
      parseMessage(msg)
    });

    client.on('messagedeleted', (channel, username, deleteMessage, userstate) => {
      setMessages(msgs => {
        const msgId = userstate["target-msg-id"];
        const allMsgs = [...msgs];
        const cleanMsgs = allMsgs.filter(m => m.id !== msgId);
        return [...cleanMsgs];
      });
    })

    client.on('ban', (channel, username) => {
      setMessages(msgs => {
        const allMsgs = [...msgs];
        const cleanMsgs = allMsgs.filter(m => m.twitch !== username);
        return [...cleanMsgs];
      });
    })

    client.on('timeout', (channel, username) => {
      setMessages(msgs => {
        const allMsgs = [...msgs];
        const cleanMsgs = allMsgs.filter(m => m.twitch !== username);
        return [...cleanMsgs];
      });
    })

    client.on('clearchat', (channel) => {
      setMessages([])
    })

    const parseMessage = (message) => {

      const options = {
        format: 'default',
        themeMode: 'light',
        scale: '2.0'
      }
  
      const cleanMsg = {
        ...message,
        message: parse(message.message, message.emotes, options)
      }
  
      setMsg(cleanMsg);
    }
  
    const setMsg = (msg) => {
      setMessages(msgs => {

        if(msgs.length >= 50) {
          msgs.shift(msgs.length, 50);
        }

        return [...msgs, msg]
      });

    }
  }, [])

  switch(themeChoose) {
    case 'Terminal':
      return (<Terminal messages={messages} />)
    default:
      return (<Terminal messages={messages} />)         
  }

}
