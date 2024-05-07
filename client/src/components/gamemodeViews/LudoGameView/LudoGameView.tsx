import { InAndOutMode } from "../../../types/global.ts";
import { PlayerToPlayerStats } from "../../../types/playerStats.ts";
import GameInputButtons from "../../buttons/GameInputButtons/GameInputButtons.tsx";
import GameMultiplierButtons from "../../buttons/GameMultiplierButtons/GameMultiplierButtons.tsx";
import { DPlayer } from "../../onlineGamemodes/OnlineGameProps.ts";
import PlayerScoreCard from "../../playerScoreCards/PlayerScoreCard/PlayerScoreCard.tsx";
import { GameViewWithScoreProps } from "../GameView.ts";

export interface LudoGameViewProps extends GameViewWithScoreProps {
  playerStats: PlayerToPlayerStats;
  cbHandleUndoClicked?(): void;

  modeOut: InAndOutMode;
  throwsRemaining: number;
}

function LudoGameView(props: LudoGameViewProps) {
  const renderPlayerScoreCard = (player: string | DPlayer) => {
    const { userID, isActive } =
      typeof player === "string" ? { userID: player, isActive: true } : player;
    const isStartingPlayer =
      props.players[props.startingPlayerIndex] === player;
    const isCurrentPlayer = props.players[props.currentPlayerIndex] === player;

    const remaining = isCurrentPlayer ? props.throwsRemaining : 3;
    return (
      <PlayerScoreCard
        key={userID}
        playerName={userID}
        isStartingPlayer={isStartingPlayer}
        isCurrentPlayer={isCurrentPlayer}
        score={props.playerStats[userID].score}
        remainingScore={props.playerStats[userID].scoreRemaining}
        average={props.playerStats[userID].average}
        lastThrows={props.playerStats[userID].lastThrows}
        checkoutOptions={props.playerStats[userID].checkoutOptions}
        sets={props.playerTotalGameStats[userID].sets}
        legs={props.playerTotalGameStats[userID].legs}
        modeOut={props.modeOut}
        disabled={!isActive}
        throwsRemaining={remaining}
      />
    );
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="card !shadow bg-base-100 w-full">
        <div className="card-body p-4">
          <h1 className="card-title text-xl font-semibold justify-center">Round: {props.currentRound}</h1>
        </div>
      </div>

      <div className="card !shadow bg-base-100 w-full">
        <div className="card-body p-4">
          <div className="flex flex-wrap flex-1 items-center gap-4">
            {props.players.map((player) => renderPlayerScoreCard(player))}
          </div>
        </div>
      </div>

      <div className="card !shadow bg-base-100 w-full">
        <div className="card-body p-4">
          <GameInputButtons
            values={[...Array(20).keys()].map((num) => num).concat(24)}
            cbHandleButtonClicked={props.cbHandleScoreBtnClicked}
            showMissButton={false}
            btnSize={20}
            disabled={props.isPlayersTurn === false}
          />
        </div>
      </div>

      <div className="card !shadow bg-base-100 w-full">
        <div className="card-body p-4">
          <div className="flex items-center justify-center">
            <GameMultiplierButtons
              multiplier={props.multiplier}
              cbHandleMultiplierClicked={props.cbHandleMultiplierClicked}
              disabled={props.isPlayersTurn === false}
            />
            {props.cbHandleUndoClicked && (
              <button className="btn btn-error m-1" onClick={props.cbHandleUndoClicked}>
                Undo
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LudoGameView;
