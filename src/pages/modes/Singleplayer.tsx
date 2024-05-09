import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Gamemode, InAndOutMode } from "../../types/global.ts";
import SettingsMenu from "../../components/game-settings/SettingsMenu.tsx";
import LocalGames from "../../components/templates/LocalGames.tsx";

function Singleplayer() {
  const navigate = useNavigate();
  const [selectedGamemode, setSelectedGamemode] = useState<Gamemode>("301");
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [setsToWin, setSetsToWin] = useState<number>(1);
  const [legsForSet, setLegsForSet] = useState<number>(1);
  const [modeIn, setModeIn] = useState<InAndOutMode>("straight");
  const [modeOut, setModeOut] = useState<InAndOutMode>("double");

  const backBtnClicked = () => navigate("/");

  const nextBtnClicked = () => setGameStarted(true);

  const backBtnGameClicked = () => setGameStarted(false);

  const gameProps = {
    selectedGamemode: selectedGamemode,
    setsToWin: setsToWin,
    legsForSet: legsForSet,
    modeIn: modeIn,
    modeOut: modeOut,
  };

  return (
    <>
      {gameStarted ? (
        <LocalGames
          {...gameProps}
          gameType={"singleplayer"}
          players={["You"]}
          cbBackBtnClicked={backBtnGameClicked}
        />
      ) : (
        <SettingsMenu
          {...gameProps}
          setSelectedGamemode={setSelectedGamemode}
          setSetsToWin={setSetsToWin}
          setLegsForSet={setLegsForSet}
          setModeIn={setModeIn}
          setModeOut={setModeOut}
          cbBackBtnClicked={backBtnClicked}
          cbNextBtnClicked={nextBtnClicked}
        />
      )}
    </>
  );
}

export default Singleplayer;
