import { useState } from "react";
import { InAndOutMode } from "../../../types/global";
import { PlayerToPlayerStats } from "../../../types/playerStats.ts";
import StandardGamesView from "../../gamemodeViews/StandardGamesView/StandardGamesView.tsx";
import { OnlineGameProps } from "../OnlineGameProps";

export interface OnlineStandardGamesProps extends OnlineGameProps {
  playerStats: PlayerToPlayerStats;
  modeOut: InAndOutMode;
}

function OnlineStandardGames(props: OnlineStandardGamesProps) {
  const [multiplier, setMultiplier] = useState<number>(1);

  const handleScoreBtnClicked = (points: number) => {
    if ((multiplier === 3 && points === 25)) return;
  };

  return (
    <StandardGamesView
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

export default OnlineStandardGames;
