import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Settings, { DART_THEME } from "./Settings.tsx";
import MainMenu from "./menus/Menu.tsx";
import Multiplayer from "./modes/Multiplayer.tsx";
import Singleplayer from "./modes/Singleplayer.tsx";
import Tournament from "./tournament/Tournament.tsx";

function App() {
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      localStorage.getItem(DART_THEME) || "default"
    );
  }, []);

  return (
    <div className="flex flex-1 bg-base-300 w-full h-full">
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/singleplayer" element={<Singleplayer />} />

        <Route path="/multiplayer" element={<Multiplayer />} />
        <Route path="/tournament" element={<Tournament />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
