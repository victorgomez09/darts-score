import { useState } from "react";
import { MultiplayerMode } from "../../../types/global";
import LocalMultiplayer from "../../localMultiplayer/LocalMultiplayer.tsx";


function Multiplayer() {
  const [_selectedMultiplayerMode, setSelectedMultiplayerMode] = useState<MultiplayerMode | null>(null);

  const handleBackBtnClicked = () => {
    setSelectedMultiplayerMode(null);
  };

  return (
    <>
      <LocalMultiplayer
        cbBackBtnClicked={handleBackBtnClicked}
      />
    </>
  );
}

export default Multiplayer;
