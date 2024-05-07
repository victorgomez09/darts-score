import { useState } from "react";
import PlayerMenu from "../PlayerMenu/PlayerMenu.tsx";
import SettingsMenu from "../SettingsMenu/SettingsMenu.tsx";
import NavigationButtons from "../../buttons/NavigationButtons/NavigationButtons.tsx";
import { PlayersAndSettingsProps } from "./PlayersAndSettings";

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
            <div className="card !shadow bg-base-100 w-8/12">
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
