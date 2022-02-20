import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Chat from "./pages/Chat/Chat";
import Home from "./pages/Home/Home";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/chat" element={<Chat />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
