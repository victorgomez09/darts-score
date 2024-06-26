import React, { useState } from "react";
import { Gamemode, InAndOutMode } from "../../types/global.ts";
import NavigationButtons from "../buttons/NavigationButtons.tsx";
import PlayerMenu from "./PlayerMenu.tsx";
import SettingsMenu from "./SettingsMenu.tsx";

export interface PlayersAndSettingsProps {
  players: string[];
  maxPlayers: number;
  validNumberOfPlayers: boolean;
  setPlayers: React.Dispatch<React.SetStateAction<string[]>>;
  selectedGamemode: Gamemode;
  setSelectedGamemode: React.Dispatch<React.SetStateAction<Gamemode>>;
  setsToWin: number;
  setSetsToWin: React.Dispatch<React.SetStateAction<number>>;
  legsForSet: number;
  setLegsForSet: React.Dispatch<React.SetStateAction<number>>;
  modeIn: InAndOutMode;
  setModeIn: React.Dispatch<React.SetStateAction<InAndOutMode>>;
  modeOut: InAndOutMode;
  setModeOut: React.Dispatch<React.SetStateAction<InAndOutMode>>;
  handleSettingsNextBtnClicked(): void;
  cbBackBtnClicked(): void;
  playerCountInfo: string;
}

function PlayersAndSettings(props: PlayersAndSettingsProps) {
  const [showSettingsMenu, setShowSettingsMenu] = useState<boolean>(false);

  const handleNextForPlayerMenu = () => {
    if (props.validNumberOfPlayers) setShowSettingsMenu(true);
  };

  const settingsBackBtnClicked = () => {
    setShowSettingsMenu(false);
  };

  return (
    <>
      {showSettingsMenu ? (
        <SettingsMenu
          selectedGamemode={props.selectedGamemode}
          setSelectedGamemode={props.setSelectedGamemode}
          setsToWin={props.setsToWin}
          setSetsToWin={props.setSetsToWin}
          legsForSet={props.legsForSet}
          setLegsForSet={props.setLegsForSet}
          cbBackBtnClicked={settingsBackBtnClicked}
          cbNextBtnClicked={props.handleSettingsNextBtnClicked}
          modeIn={props.modeIn}
          setModeIn={props.setModeIn}
          modeOut={props.modeOut}
          setModeOut={props.setModeOut}
        />
      ) : (
        <div className="hero">
          <div className="hero-content w-full h-full">
            <div className="card !shadow bg-base-100 w-10/12">
              <div className="card-body p-4">
                <PlayerMenu
                  players={props.players}
                  maxPlayers={props.maxPlayers}
                  setPlayers={props.setPlayers}
                  isEditable={true}
                  playerCountInfo={props.playerCountInfo}
                />
                <NavigationButtons
                  cbBackBtnClicked={props.cbBackBtnClicked}
                  cbNextBtnClicked={handleNextForPlayerMenu}
                  nextBtnDisabled={!props.validNumberOfPlayers}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PlayersAndSettings;
