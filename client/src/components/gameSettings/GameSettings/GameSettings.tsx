import { InAndOutMode } from "../../../types/global";
import { GameSettingsProps } from "./GameSettings";

function GameSettings(props: GameSettingsProps) {
  const handleInputChangeSets = (event: any) => {
    props.setIsError(false);
    props.setSetsToWin(event.target.value);
  };

  const handleInputChangeLegs = (event: any) => {
    props.setIsError(false);
    props.setLegsForSet(event.target.value);
  };

  const handleCheckboxModeInChange = (mode: InAndOutMode) => {
    props.setModeIn(mode);
  };

  const handleCheckboxModeOutChange = (mode: InAndOutMode) => {
    props.setModeOut(mode);
  };

  return (
    <div>
      <h1 className="text-center font-semibold text-lg mb-1">Settings</h1>
      <div className="flex flex-col gap-2">
        <h1>First to:</h1>
        <div className="flex items-center gap-2">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Sets:</span>
            </div>
            <input
              className="input input-bordered w-full max-w-xs"
              type="number"
              min="1"
              max="20"
              value={props.setsToWin}
              onChange={handleInputChangeSets} />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Legs:</span>
            </div>
            <input
              className="input input-bordered w-full max-w-xs"
              type="number"
              min="1"
              max="10"
              value={props.legsForSet}
              onChange={handleInputChangeLegs} />
          </label>
        </div>
      </div>
      {(props.selectedGamemode === "301" ||
        props.selectedGamemode === "501" ||
        props.selectedGamemode === "ludo") && (
          <>
            <div className="divider opacity-55 p-0 m-0"></div>

            <div className="flex flex-col">
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text">Straight In</span>
                  <input className="checkbox checkbox-primary"
                    type="checkbox"
                    checked={props.modeIn === "straight"}
                    onChange={() => handleCheckboxModeInChange("straight")} />
                </label>
              </div>

              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text">Double In</span>
                  <input className="checkbox checkbox-primary"
                    type="checkbox"
                    checked={props.modeIn === "double"}
                    onChange={() => handleCheckboxModeInChange("double")} />
                </label>
              </div>
            </div>

            <div className="divider opacity-55 p-0 m-0"></div>

            <div className="flex flex-col">
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text">Straight Out</span>
                  <input className="checkbox checkbox-primary"
                    type="checkbox"
                    checked={props.modeOut === "straight"}
                    onChange={() => handleCheckboxModeOutChange("straight")} />
                </label>
              </div>

              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text">Double Out</span>
                  <input className="checkbox checkbox-primary"
                    type="checkbox"
                    checked={props.modeOut === "double"}
                    onChange={() => handleCheckboxModeOutChange("double")} />
                </label>
              </div>
            </div>
          </>
        )}
    </div>
  );
}
export default GameSettings;
