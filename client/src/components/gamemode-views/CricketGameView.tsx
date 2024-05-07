import { useEffect } from "react";
import { PlayerToPlayerStatsCricket } from "../../types/playerStats.ts";
import GameInputButtons from "../buttons/GameInputButtons.tsx";
import GameMultiplierButtons from "../buttons/GameMultiplierButtons.tsx";
import { DPlayer } from "../engine/online/OnlineGameProps.ts";
import PlayerScoreCardCricket from "../player-cards/PlayerScoreCardCricket.tsx";
import { GameViewWithScoreProps } from "./GameView.ts";

export interface CricketGameViewProps extends GameViewWithScoreProps {
  playerStats: PlayerToPlayerStatsCricket;
  throwsRemaining: number;
}

function CricketGameView(props: CricketGameViewProps) {
  useEffect(() => {
    const element = document.getElementById(
      props.players[props.currentPlayerIndex]
    );
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [props.currentPlayerIndex, props.players]);

  const renderPlayerScoreCard = (player: string | DPlayer) => {
    const { userID, isActive } =
      typeof player === "string" ? { userID: player, isActive: true } : player;
    const isStartingPlayer =
      props.players[props.startingPlayerIndex] === player;
    const isCurrentPlayer = props.players[props.currentPlayerIndex] === player;
    const remaining = isCurrentPlayer ? props.throwsRemaining : 3;

    return (
      <PlayerScoreCardCricket
        key={userID}
        playerName={userID}
        isStartingPlayer={isStartingPlayer}
        isCurrentPlayer={isCurrentPlayer}
        score={props.playerStats[userID].score}
        cricketStats={props.playerStats[userID].cricketStats}
        sets={props.playerTotalGameStats[userID].sets}
        legs={props.playerTotalGameStats[userID].legs}
        disabled={!isActive}
        throwsRemaining={remaining}
      />
    );
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
      <div className="card !shadow bg-base-100 w-full">
        <div className="bg-body p-4">
          <p className="card-title justify-center">
            Ronda: {props.currentRound}
          </p>
        </div>
      </div>

      <div className="card !shadow bg-base-100 w-full h-full overflow-auto">
        <div className="bg-body p-4">
          <div className="flex flex-wrap gap-2">
            {props.players.map((player) => renderPlayerScoreCard(player))}
          </div>
        </div>
      </div>

      <div className="card !shadow bg-base-100 w-full">
        <div className="card-body p-4">
          <GameInputButtons
            values={[...Array(6).keys()].map((num) => 14 + num).concat(24)}
            cbHandleButtonClicked={props.cbHandleScoreBtnClicked}
            showMissButton={true}
            btnSize={60}
            disabled={props.isPlayersTurn === false}
          />
        </div>
      </div>

      <div className="card !shadow bg-base-100 w-full">
        <div className="card-body justify-center p-4">
          <GameMultiplierButtons
            multiplier={props.multiplier}
            cbHandleMultiplierClicked={props.cbHandleMultiplierClicked}
            disabled={props.isPlayersTurn === false}
          />
        </div>
      </div>
    </div>
  );
}

export default CricketGameView;
