import { InAndOutMode } from "../../types/global";

export interface GameInformationHeaderProps {
  throwsRemaining: number;
  setsToWin: number;
  legsForSet: number;
  modeIn?: InAndOutMode;
  modeOut?: InAndOutMode;
}

function GameInformationHeader(props: GameInformationHeaderProps) {
  return (
    <div className="flex items-center justify-center m-0 pt-2 pb-2">
      <p className="mr-4">
        <strong>Remaining throws:</strong> {props.throwsRemaining}
      </p>
      <p className="mr-4">
        <strong>First to:</strong> {props.setsToWin} {props.setsToWin > 1 ? "Sets" : "Set"}
      </p>
      <p className="mr-4">
        <strong>Legs per set:</strong> {props.legsForSet}
      </p>
      {props.modeIn && (
        <p className="mr-4">
          <strong>{props.modeIn} in</strong>
        </p>
      )}
      {props.modeOut && (
        <p className="mr-0">
          <strong>{props.modeOut} out</strong>
        </p>
      )}
    </div>
  );
}

export default GameInformationHeader;
