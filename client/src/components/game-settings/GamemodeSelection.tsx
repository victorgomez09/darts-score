import React from "react";
import { Gamemode } from "../../types/global";

export interface GamemodeSelectionProps {
  selectedGamemode: Gamemode;
  setSelectedGamemode: React.Dispatch<React.SetStateAction<Gamemode>>;
}

function GamemodeSelection(props: GamemodeSelectionProps) {
  const handleMenuClick = (gamemode: Gamemode) => {
    props.setSelectedGamemode(gamemode);
  };

  const isCurrentlySelected = (gamemode: Gamemode) => {
    return props.selectedGamemode === gamemode;
  };

  return (
    <>
      <div className="text-center">
        <h1 className="text-lg font-semibold mb-3">Choose Gamemode</h1>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          className={`btn btn-primary m-1 ${
            isCurrentlySelected("301") ? "btn-secondary" : ""
          }`}
          onClick={() => handleMenuClick("301")}
        >
          301
        </button>
        <button
          className={`btn btn-primary m-1 ${
            isCurrentlySelected("501") ? "btn-secondary" : ""
          }`}
          onClick={() => handleMenuClick("501")}
        >
          501
        </button>
        {/* <button
          className={`btn btn-primary m-1 ${
            isCurrentlySelected("rcl") ? "btn-secondary" : ""
          }`}
          onClick={() => handleMenuClick("rcl")}
        >
          rCl
        </button> */}
        <button
          className={`btn btn-primary m-1 ${
            isCurrentlySelected("cri") ? "btn-secondary" : ""
          }`}
          onClick={() => handleMenuClick("cri")}
        >
          Cricket
        </button>
        <button
          className={`btn btn-primary m-1 ${
            isCurrentlySelected("ludo") ? "btn-secondary" : ""
          }`}
          onClick={() => handleMenuClick("ludo")}
        >
          Ludo
        </button>
      </div>
    </>
  );
}

export default GamemodeSelection;
