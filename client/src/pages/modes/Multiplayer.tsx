import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlayersAndSettings from "../../components/game-settings/PlayersAndSettings.tsx";
import LocalGames from "../../components/templates/LocalGames.tsx";
import { Gamemode, InAndOutMode } from "../../types/global.ts";

function Multiplayer() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState(["Vira"]);
  const [selectedGamemode, setSelectedGamemode] = useState<Gamemode>("301");
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [setsToWin, setSetsToWin] = useState<number>(1);
  const [legsForSet, setLegsForSet] = useState<number>(1);
  const [modeIn, setModeIn] = useState<InAndOutMode>("straight");
  const [modeOut, setModeOut] = useState<InAndOutMode>("double");

  const handleBackToPlayerMenu = () => {
    setGameStarted(false);
    setSelectedGamemode("301");
  };

  const numberOfPlayersCondition = (): boolean => {
    return players.length > 1;
  };

  const gameProps = {
    players: players,
    selectedGamemode: selectedGamemode,
    setsToWin: setsToWin,
    legsForSet: legsForSet,
    modeIn: modeIn,
    modeOut: modeOut,
  };

  const backBtnClicked = () => navigate("/");

  return (
    <>
      {gameStarted ? (
        <LocalGames
          {...gameProps}
          gameType={"local"}
          cbBackBtnClicked={handleBackToPlayerMenu}
        />
      ) : (
        <PlayersAndSettings
          {...gameProps}
          maxPlayers={8}
          validNumberOfPlayers={numberOfPlayersCondition()}
          playerCountInfo="2-8 players required to start"
          setSelectedGamemode={setSelectedGamemode}
          setPlayers={setPlayers}
          setLegsForSet={setLegsForSet}
          setSetsToWin={setSetsToWin}
          setModeIn={setModeIn}
          setModeOut={setModeOut}
          cbBackBtnClicked={backBtnClicked}
          handleSettingsNextBtnClicked={() => {
            setGameStarted(true);
          }}
        />
      )}
    </>
  );
}

export default Multiplayer;
