import React from "react";
import { Gamemode, InAndOutMode } from "../../types/global";

export interface GameSettingsProps {
  selectedGamemode: Gamemode;
  setsToWin: number;
  setSetsToWin: React.Dispatch<React.SetStateAction<number>>;
  legsForSet: number;
  setLegsForSet: React.Dispatch<React.SetStateAction<number>>;
  modeIn: InAndOutMode;
  setModeIn: React.Dispatch<React.SetStateAction<InAndOutMode>>;
  modeOut: InAndOutMode;
  setModeOut: React.Dispatch<React.SetStateAction<InAndOutMode>>;
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
}

function GameSettings(props: GameSettingsProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChangeSets = (event: any) => {
    props.setIsError(false);
    props.setSetsToWin(event.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      <h1 className="text-center font-semibold text-lg mb-1">
        Ajustes del juego
        <label
          htmlFor="my_modal_7"
          role="button"
          className="btn btn-circle btn-ghost btn-xs text-info"
        >
          <svg
            tabIndex={0}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="w-4 h-4 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </label>
      </h1>
      <div className="flex flex-col gap-2">
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
              onChange={handleInputChangeSets}
            />
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
              onChange={handleInputChangeLegs}
            />
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
                <input
                  className="checkbox checkbox-primary"
                  type="checkbox"
                  checked={props.modeIn === "straight"}
                  onChange={() => handleCheckboxModeInChange("straight")}
                />
              </label>
            </div>

            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Double In</span>
                <input
                  className="checkbox checkbox-primary"
                  type="checkbox"
                  checked={props.modeIn === "double"}
                  onChange={() => handleCheckboxModeInChange("double")}
                />
              </label>
            </div>
          </div>

          <div className="divider opacity-55 p-0 m-0"></div>

          <div className="flex flex-col">
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Straight Out</span>
                <input
                  className="checkbox checkbox-primary"
                  type="checkbox"
                  checked={props.modeOut === "straight"}
                  onChange={() => handleCheckboxModeOutChange("straight")}
                />
              </label>
            </div>

            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Double Out</span>
                <input
                  className="checkbox checkbox-primary"
                  type="checkbox"
                  checked={props.modeOut === "double"}
                  onChange={() => handleCheckboxModeOutChange("double")}
                />
              </label>
            </div>
          </div>
        </>
      )}

      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Info 📖</h3>
          <div className="py-4">
            <ul>
              <li>
                <span className="font-semibold italic">LEG</span>: Cuando un
                jugador coloca su marcador a cero, se lleva la partida.
              </li>
              <li>
                <span className="font-semibold italic">SET</span>: Conjunto de
                legs.
              </li>
            </ul>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </div>
  );
}
export default GameSettings;
