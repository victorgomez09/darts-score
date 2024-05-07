import { PlayerToPlayerStatsRCl } from "../../../types/playerStats.ts";
import RoundTheClockGameView from "../../gamemode-views/RoundTheClockGameView.tsx";
import { OnlineGameProps } from "./OnlineGameProps.ts";

export interface OnlineRoundTheClockGameProps extends OnlineGameProps {
  playerStats: PlayerToPlayerStatsRCl;
}

function OnlineRoundTheClockGame(props: OnlineRoundTheClockGameProps) {
  return (
    <RoundTheClockGameView
      currentRound={props.currentRound}
      players={props.players}
      startingPlayerIndex={props.startingPlayerIndex}
      currentPlayerIndex={props.currentPlayerIndex}
      playerTotalGameStats={props.playerTotalGameStats}
      playerStats={props.playerStats}
      isPlayersTurn={props.isPlayersTurn}
      cbHandleHitClicked={handleHitClicked}
      cbHandleMissClicked={handleMissClicked}
      cbHandleNextClicked={handleSkipClicked}
    />
  );
}

export default OnlineRoundTheClockGame;
