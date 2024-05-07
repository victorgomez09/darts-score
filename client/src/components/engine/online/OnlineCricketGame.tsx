import { useState } from "react";
import { PlayerToPlayerStatsCricket } from "../../../types/playerStats.ts";
import { OnlineGameProps } from "./OnlineGameProps.ts";
import CricketGameView from "../../gamemode-views/CricketGameView.tsx";

export interface OnlineCricketGameProps extends OnlineGameProps {
  playerStats: PlayerToPlayerStatsCricket;
}

function OnlineCricketGame(props: OnlineCricketGameProps) {
  const [multiplier, setMultiplier] = useState<number>(1);

  const handleScoreBtnClicked = (points: number) => {
    if (multiplier === 3 && points === 25) return;
  };

  return (
    <CricketGameView
      currentRound={props.currentRound}
      players={props.players}
      startingPlayerIndex={props.startingPlayerIndex}
      currentPlayerIndex={props.currentPlayerIndex}
      playerTotalGameStats={props.playerTotalGameStats}
      playerStats={props.playerStats}
      cbHandleScoreBtnClicked={handleScoreBtnClicked}
      multiplier={multiplier}
      cbHandleMultiplierClicked={setMultiplier}
      throwsRemaining={props.throwsRemaining}
    />
  );
}

export default OnlineCricketGame;
