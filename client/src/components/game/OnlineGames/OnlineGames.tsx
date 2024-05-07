import { useEffect, useState } from "react";
import { Gamemode, InAndOutMode } from "../../../types/global";
import {
  PlayerToPlayerStats,
  PlayerToPlayerStatsCricket,
  PlayerToPlayerStatsRCl,
  PlayerToPlayerTotalGameStats,
} from "../../../types/playerStats.ts";
import NavigationButtons from "../../buttons/NavigationButtons/NavigationButtons.tsx";
import GameInformationHeader from "../../gameInformationHeader/GameInformationHeader.tsx";
import OnlineCricketGame from "../../onlineGamemodes/OnlineCricketGame/OnlineCricketGame.tsx";
import { DPlayer } from "../../onlineGamemodes/OnlineGameProps.ts";
import OnlineLudoGame from "../../onlineGamemodes/OnlineLudoGame/OnlineLudoGames.tsx";
import OnlineRoundTheClockGame from "../../onlineGamemodes/OnlineRoundTheClockGame/OnlineRoundTheClockGame.tsx";
import OnlineStandardGames from "../../onlineGamemodes/OnlineStandardGames/OnlineStandardGames.tsx";
import EndGamePopUp from "../../popUps/EndGamePopUp/EndGamePopUp.tsx";
import YesNoPopUp from "../../popUps/YesNoPopUp/YesNoPopUp.tsx";

export interface OnlineGamesProps {
  selectedGamemode: Gamemode;
  players: DPlayer[];
  cbBackBtnClicked(): void;
  setsToWin: number;
  legsForSet: number;
  modeIn: InAndOutMode;
  modeOut: InAndOutMode;
  initialGameStats: DGameData;
}

export interface DGameData {
  currentRound: number;
  startingPlayerIndex: number;
  currentPlayerIndex: number;
  throwsRemaining: number;
  playerStats: PlayerToPlayerStats | PlayerToPlayerStatsRCl | PlayerToPlayerStatsCricket;
  totalGameStats: PlayerToPlayerTotalGameStats;
  winner: string | null;
}

function OnlineGames(props: OnlineGamesProps) {
  const [showGoToMainMenuPopUp, setShowGoToMainMenuPopUp] =
    useState<boolean>(false);
  const [playerStats, setPlayerStats] = useState<
    PlayerToPlayerStats | PlayerToPlayerStatsRCl | PlayerToPlayerStatsCricket
  >(props.initialGameStats.playerStats);
  const [winningPlayer, setWinningPlayer] = useState<string | null>(null);

  const gameProps = {
    players: props.players,
    playerTotalGameStats: props.initialGameStats.totalGameStats,
    throwsRemaining: props.initialGameStats.throwsRemaining,
    currentRound: props.initialGameStats.currentRound,
    startingPlayerIndex: props.initialGameStats.startingPlayerIndex,
    currentPlayerIndex: props.initialGameStats.currentPlayerIndex,
    isPlayersTurn: props.initialGameStats.currentPlayerIndex,
  };

  return (
    <div className="flex items-center p-2">
      {winningPlayer && (
        <EndGamePopUp
          winnerName={winningPlayer}
          totalGameStats={props.initialGameStats.totalGameStats[winningPlayer]}
          gameType={"online"}
          gamemode={props.selectedGamemode}
          cbBtnClicked={props.cbBackBtnClicked}
        />
      )}
      {showGoToMainMenuPopUp && (
        <YesNoPopUp
          content={"Do you really want to leave the game?"}
          cbYesClicked={props.cbBackBtnClicked}
          cbNoClicked={() => setShowGoToMainMenuPopUp(false)}
        />
      )}
      <GameInformationHeader
        throwsRemaining={props.initialGameStats.throwsRemaining}
        setsToWin={props.setsToWin}
        legsForSet={props.legsForSet}
        modeIn={
          props.selectedGamemode === "301" || props.selectedGamemode === "501"
            ? props.modeIn
            : undefined
        }
        modeOut={
          props.selectedGamemode === "301" || props.selectedGamemode === "501"
            ? props.modeOut
            : undefined
        }
      />
      {(props.selectedGamemode === "301" ||
        props.selectedGamemode === "501") && (
          <OnlineStandardGames
            {...gameProps}
            modeOut={props.modeOut}
            playerStats={playerStats as PlayerToPlayerStats}
          />
        )}
      {props.selectedGamemode === "rcl" && (
        <OnlineRoundTheClockGame
          {...gameProps}
          playerStats={playerStats as PlayerToPlayerStatsRCl}
        />
      )}
      {props.selectedGamemode === "cri" && (
        <OnlineCricketGame
          {...gameProps}
          playerStats={playerStats as PlayerToPlayerStatsCricket}
        />
      )}
      {props.selectedGamemode === "ludo" && (
        <OnlineLudoGame
          {...gameProps}
          modeOut={props.modeOut}
          playerStats={playerStats as PlayerToPlayerStats}
        />
      )}
      <NavigationButtons
        cbBackBtnClicked={() => setShowGoToMainMenuPopUp(true)}
        marginTop={0}
      />
    </div>
  );
}

export default OnlineGames;
