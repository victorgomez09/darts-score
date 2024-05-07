import { useState } from "react";
import GamemodeSelection from "../GamemodeSelection/GamemodeSelection.tsx";
import GameSettings from "../GameSettings/GameSettings.tsx";
import NavigationButtons from "../../buttons/NavigationButtons/NavigationButtons.tsx";
import { SettingsMenuProps } from "./SettingsMenu";

function SettingsMenu(props: SettingsMenuProps) {
  const [isError, setIsError] = useState<boolean>(false);

  const invalidSetsLegsInput = (): boolean => {
    return props.setsToWin < 1 || props.setsToWin > 20 || props.legsForSet < 1 || props.legsForSet > 10;
  };

  const handleNext = () => {
    if (invalidSetsLegsInput()) {
      setIsError(true);
      return;
    }
    props.cbNextBtnClicked();
  };

  return (
    <div className="flex flex-1 items-center justify-center gap-2 overflow-hidden">
      <div className="card !shadow bg-base-100 h-5/6 w-8/12">
        <div className="card-body overflow-auto">
          <GamemodeSelection
            selectedGamemode={props.selectedGamemode}
            setSelectedGamemode={props.setSelectedGamemode}
          />
          <div className="divider p-0 m-0"></div>
          <GameSettings
            selectedGamemode={props.selectedGamemode}
            setsToWin={props.setsToWin}
            setSetsToWin={props.setSetsToWin}
            legsForSet={props.legsForSet}
            setLegsForSet={props.setLegsForSet}
            modeIn={props.modeIn}
            setModeIn={props.setModeIn}
            modeOut={props.modeOut}
            setModeOut={props.setModeOut}
            isError={isError}
            setIsError={setIsError}
          />
          <NavigationButtons cbBackBtnClicked={props.cbBackBtnClicked} cbNextBtnClicked={handleNext} />
        </div>
      </div>
    </div>
  );
}

export default SettingsMenu;
