import { Route, Routes } from "react-router-dom";
import MainMenu from "./menus/MainMenu.tsx";
import Multiplayer from "./modes/Multiplayer.tsx";
import Singleplayer from "./modes/Singleplayer.tsx";
import Tournament from "./tournament/Tournament.tsx";

function App() {
  return (
    <div className="flex flex-1 bg-base-300 w-full h-full">
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/singleplayer" element={<Singleplayer />} />

        <Route path="/multiplayer" element={<Multiplayer />} />
        <Route path="/tournament" element={<Tournament />} />
      </Routes>
    </div>
  );
}

export default App;
