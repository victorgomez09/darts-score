import { useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import io from "socket.io-client";
import axios from "../api/axios";
import Footer from "../components/footer/Footer/Footer.tsx";
import Login from "./authentication/Login/Login.tsx";
import Register from "./authentication/Register/Register.tsx";
import RegisterVerify from "./authentication/RegisterVerify/RegisterVerify";
import CheckoutCalculator from "./information/CheckoutCalculator/CheckoutCalculator";
import MainMenu from "./menus/MainMenu/MainMenu.tsx";
import Multiplayer from "./modes/Multiplayer/Multiplayer.tsx";
import Singleplayer from "./modes/SinglePlayer/Singleplayer.tsx";
import Settings from "./settings/Settings.tsx";
import Statistics from "./statistics/Statistics.tsx";
import Tournament from "./tournament/Tournament.tsx";

const GENERAL_AUTH = "/generalAuth";
let socket = io();
function App() {
  const pwdRef = useRef<HTMLInputElement | null>(null);
  const [loginErrorMsg, setLoginErrorMsg] = useState<string>(
    "This password or username is invalid"
  );
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [displayUserID, setDisplayUserID] = useState<string>("");

  useEffect(() => {
    socket = io("http://localhost:4000", {
      transports: ["websocket"],
      withCredentials: true,
      autoConnect: false,
    });

    if (!socket.connected) {
      socket.connect();
    }
  }, []);

  useEffect(() => {
    axios
      .get(GENERAL_AUTH, {
        withCredentials: true,
      })
      .then((res) => {
        setLoggedIn(true);
        setDisplayUserID(res.data.userID);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <MainMenu
              setDisplayUserID={setDisplayUserID}
              isLoggedIn={isLoggedIn}
              setLoggedIn={setLoggedIn}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              loginErrorMsg={loginErrorMsg}
              pwdRef={pwdRef}
              setLoginErrorMsg={setLoginErrorMsg}
              setLoggedIn={setLoggedIn}
              setDisplayUserID={setDisplayUserID}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              loginErrorMsg={loginErrorMsg}
              pwdRef={pwdRef}
              setLoginErrorMsg={setLoginErrorMsg}
            />
          }
        />
        <Route path="/register/verify" element={<RegisterVerify />} />
        <Route
          path="/singleplayer"
          element={
            <Singleplayer
              isLoggedIn={isLoggedIn}
              displayUserID={displayUserID}
            />
          }
        />

        <Route
          path="/multiplayer"
          element={
            <Multiplayer
              socket={socket}
              displayUserID={displayUserID}
              isLoggedIn={isLoggedIn}
            />
          }
        />
        <Route
          path="/tournament"
          element={
            <Tournament isLoggedIn={isLoggedIn} displayUserID={displayUserID} />
          }
        />
        <Route path="/checkoutCalculator" element={<CheckoutCalculator />} />
        <Route
          path="/settings"
          element={
            <Settings
              displayUserID={displayUserID}
              setDisplayUserID={setDisplayUserID}
              setLoggedIn={setLoggedIn}
            />
          }
        />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
      <Footer isLoggedIn={isLoggedIn} userID={displayUserID} />
    </>
  );
}

export default App;
