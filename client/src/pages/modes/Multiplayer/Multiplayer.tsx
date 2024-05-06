import { useState } from "react";
import { MultiplayerMode } from "../../../types/global";
import LocalMultiplayer from "../../localMultiplayer/LocalMultiplayer.tsx";
import MultiplayerMenu from "../../menus/MultiplayerMenu/MultiplayerMenu.tsx";
import { MultiplayerProps } from "./Multiplayer";

function Multiplayer(props: MultiplayerProps) {
  const [selectedMultiplayerMode, setSelectedMultiplayerMode] =
    useState<MultiplayerMode | null>(null);

  const handleBackBtnClicked = () => {
    setSelectedMultiplayerMode(null);
  };

  return (
    <>
      {selectedMultiplayerMode ? (
        <div>
          {selectedMultiplayerMode === "local" && (
            <LocalMultiplayer
              cbBackBtnClicked={handleBackBtnClicked}
              isLoggedIn={props.isLoggedIn}
              displayUserID={props.displayUserID}
            />
          )}
        </div>
      ) : (
        <MultiplayerMenu
          isLoggedIn={props.isLoggedIn}
          cbMultiplayerModeSelected={setSelectedMultiplayerMode}
        />
      )}
    </>
  );
}

export default Multiplayer;
