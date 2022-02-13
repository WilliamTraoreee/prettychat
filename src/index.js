import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Chat from './pages/Chat/Chat';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/chat" element={<Chat />}></Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);