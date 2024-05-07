import { useState } from "react";
import { InAndOutMode } from "../../../types/global.ts";
import { PlayerToPlayerStats } from "../../../types/playerStats.ts";
import { OnlineGameProps } from "./OnlineGameProps.ts";
import LudoGameView from "../../gamemode-views/LudoGameView.tsx";

export interface OnlineLudoGameProps extends OnlineGameProps {
  playerStats: PlayerToPlayerStats;
  modeOut: InAndOutMode;
}

function OnlineLudoGame(props: OnlineLudoGameProps) {
  const [multiplier, setMultiplier] = useState<number>(1);

  const handleScoreBtnClicked = (points: number) => {
    if (multiplier === 3 && points === 25) return;
  };

  return (
    <LudoGameView
      currentRound={props.currentRound}
      players={props.players}
      startingPlayerIndex={props.startingPlayerIndex}
      currentPlayerIndex={props.currentPlayerIndex}
      playerTotalGameStats={props.playerTotalGameStats}
      playerStats={props.playerStats}
      cbHandleScoreBtnClicked={handleScoreBtnClicked}
      multiplier={multiplier}
      cbHandleMultiplierClicked={setMultiplier}
      modeOut={props.modeOut}
      throwsRemaining={props.throwsRemaining}
    />
  );
}

export default OnlineLudoGame;
