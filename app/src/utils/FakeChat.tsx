import { v4 as uuidv4 } from 'uuid';
import { Message } from '../types/Messages';

function randomMessage() {

  const message: Message = {
    id: uuidv4(),
    username: getPseudo(),
    twitch: getPseudo().toLocaleLowerCase(),
    date: new Date(),
    message: getMessage(),
    badges: getBadges(),
    mod: false,
    subscriber: false,
    color: getColor(),
    emotes: {}
  }

  return message;

}

function getBadges() {

  const badges = [
    {vip: '1'},
    {moderator: '1'},
    {broadcaster: '1'},
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
  ]

  return badges[Math.floor(Math.random() * badges.length)]

}

function getColor() {

  const colors = [
    '#EB2522',
    '#EB7622',
    '#EBCB22',
    '#77F52A',
    '#2AF5A0',
    '#2AA0F5',
    '#2A3EF5',
    '#832AF5',
    '#F52ABC'
  ]

  return colors[Math.floor(Math.random() * colors.length)];

}

function getPseudo() {

  const pseudos = [
    'WitcherMini',
    'HydroCrazy',
    'NightVador',
    'RikuFly',
    'XxxJackpot',
    'NovaBronze',
    'StunPython',
    'EpicCraft',
    'DrakeDemon',
    'BraveDemon',
    'FlyMilo'
  ];

  return pseudos[Math.floor(Math.random() * pseudos.length)];

}

function getMessage() {

  const sentences = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Sed libero massa, pharetra eget nisi a, maximus pellentesque nulla. Nulla ante sem, accumsan sed eros et, pulvinar rutrum leo',
    'Duis auctor aliquam neque id consectetur.',
    'Sed pulvinar neque vitae felis tristique vulputate.',
    'Sed in venenatis metus.',
    'Aenean vel quam turpis. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
    'Suspendisse ullamcorper accumsan odio, vitae fermentum massa sagittis nec.',
    'Curabitur fringilla et tortor at luctus.',
    'Aliquam eu ipsum ante. Vestibulum vel rhoncus enim.'
  ];

  return sentences[Math.floor(Math.random() * sentences.length)];

}

export default randomMessage;