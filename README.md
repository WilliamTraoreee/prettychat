<p align="center">
  <a href="https://prettych.at/">
    <img src="https://files.wil-liam.com/prettychat.png" alt="PrettyChat logo" />
  </a>
</p>

<p align="center">
  <a href="https://prettych.at/">
    🖥️ Website
  </a>
</p>

<br>

# PrettyChat - Prettier chat for Twitch streamer

PrettyChat is a tool for Twitch streamer that want display a beautiful chat on they're stream.

## How it works

The goal is to build an easy and user friendly way to make a beautiful stream overlay.
You don't need to login, we don't record any data from you and it's completely free.

You have just to put your Twitch username, choose a theme a we do the magic.

### Tools

PrettyChat is an open source project build with ReactJS (Create React App).
For get the chat message of a channel, we use <a href="https://github.com/tmijs/tmi.js" target="_blank">Tmi.JS</a>

### Quick start API

```jsx
// install and launch the database
docker-compose up -d
// go to the api
cd api
// Install the project
npm install
// add the uuid plugin to the db
npx mikro-orm database:import ./src/migrations/uuid-osp.sql
// migrate the db and install the seed
npm run schema:update
// add seed
npm run schema:seed
// start the dev server
npm run start:dev
```

### Quick start App

```jsx
// Install the project
npm install
// Start the project
npm start
// Build the project
npm run build
// For generate graphql schema
npm run generate
// For generate graphqk schema and watch for change
npm run generate:watch
```

### Roadmap

<ul>
  <li>Custom parameters on chat theme</li>
  <li>Twitch alerts (theme + custom Lottie JSON)</li>
  <li>Chat theme builder</li>
</ul>

### Contributors

<ul>
  <li><a href="https://github.com/WilliamTraoreee" target="_blank">WilliamTraoreee</a> - Creator / Terminal & Will theme</li>
  <li><a href="https://github.com/BeardedBear" target="_blank">BeardedBear</a> - Core / CleanyBear & BearBoy theme</li>
  <li><a href="https://github.com/dglsn" target="_blank">dglsn</a> - Core (responsive)</li>
</ul>