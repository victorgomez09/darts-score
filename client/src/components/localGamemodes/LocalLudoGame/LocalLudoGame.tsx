import { useState } from "react";
import "../../../styles/App.css";
import "../../../styles/Games.css";
import {
  PlayerStats,
  PlayerToPlayerStats,
} from "../../../types/playerStats.ts";
import { getAllOptions, sumRound } from "../../../helpers/calcCheckouts.ts";
import { stringifyThrow } from "../../../helpers/stringifyThrow.ts";
import { InAndOutMode } from "../../../types/global";
import { BaseGameProps } from "../BaseGameProps";
import LudoGameView from "../../gamemodeViews/LudoGameView/LudoGameView.tsx";

export interface LocalLudoGameProps extends BaseGameProps {
  modeIn: InAndOutMode;
  modeOut: InAndOutMode;
  setThrowsRemaining: React.Dispatch<React.SetStateAction<number>>;
  setCurrentRound: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPlayerIndex: React.Dispatch<React.SetStateAction<number>>;
}

const initializePlayerStats = (
  players: string[],
  playerStats: PlayerToPlayerStats = {},
  thrownPoints?: number,
  winningPlayerIndex?: number
): PlayerToPlayerStats => {
  const initialPoints: PlayerToPlayerStats = {};
  players.forEach((player, index) => {
    const stats = playerStats[player] || {
      average: 0,
      dartsThrown: 0,
      totalScore: 0,
    };
    initialPoints[player] = {
      score: 0,
      scoreAtBeginningOfRound: 0,
      scoreRemaining: 301,
      average:
        index === winningPlayerIndex
          ? ((stats.totalScore + (thrownPoints || 0)) * 3) /
              (stats.dartsThrown + 1) || 0
          : stats.average,
      dartsThrown: stats.dartsThrown + (index === winningPlayerIndex ? 1 : 0),
      totalScore:
        index === winningPlayerIndex
          ? stats.totalScore + (thrownPoints || 0)
          : stats.totalScore,
      turns: 0,
      lastThrows: [],
      throwsRemaining: 0,
      checkoutOptions: [],
    };
  });

  return initialPoints;
};

function LocalLudoGame({
  currentPlayerIndex,
  throwsRemaining,
  ...props
}: LocalLudoGameProps) {
  const [players] = useState<string[]>(props.players);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [previousPlayerStats, setPreviousPlayerStats] = useState<
    PlayerStats | Record<string, never>
  >({});
  const [playerStats, setPlayerStats] = useState<PlayerToPlayerStats>(() =>
    initializePlayerStats(props.players)
  );
  const [isPlayerKilled, setIsPlayerKilled] = useState<boolean>(false);
  const [playerKilled, setPlayerKilled] = useState<string>("");

  const handleScoreChange = (points: number): void => {
    if (multiplier === 3 && points === 25) return;
    if (shouldSetPointsToZero()) points = 0;

    savePreviousPlayerStats(currentPlayerIndex);
    const beginningOfRound = throwsRemaining === 3;
    if (beginningOfRound) {
      saveBeginningScore(currentPlayerIndex);
      clearLastThrowsOfPlayer(currentPlayerIndex);
    }

    addThrowToLastThrows(currentPlayerIndex, points, multiplier);
    updateScoreForPlayerAndContinueGame(currentPlayerIndex, points);
  };

  const shouldSetPointsToZero = () => {
    const violatesDoubleInMode =
      playerStats[players[currentPlayerIndex]].score === 301 &&
      props.modeIn === "double" &&
      (multiplier === 1 || multiplier === 3);
    return violatesDoubleInMode;
  };

  const savePreviousPlayerStats = (playerIndex: number): void => {
    setPreviousPlayerStats({
      ...structuredClone(playerStats[players[playerIndex]]),
      throwsRemaining: throwsRemaining,
    });
  };

  const saveBeginningScore = (playerIndex: number): void => {
    setPlayerStats((prevPlayerStats) => ({
      ...prevPlayerStats,
      [players[playerIndex]]: setBeginningScoreForPlayer(
        playerStats[players[playerIndex]]
      ),
    }));
  };

  const setBeginningScoreForPlayer = (
    playerStats: PlayerStats
  ): PlayerStats => {
    playerStats.scoreAtBeginningOfRound = playerStats.score;
    return playerStats;
  };

  const clearLastThrowsOfPlayer = (playerIndex: number): void => {
    const playerKey = players[playerIndex];
    setPlayerStats((prevPlayerStats) => ({
      ...prevPlayerStats,
      [playerKey]: setLastThrows(playerStats[playerKey], []),
    }));
  };

  const addThrowToLastThrows = (
    playerIndex: number,
    points: number,
    multiplier: number
  ): void => {
    const formattedThrow = stringifyThrow(points, multiplier);
    console.log("formattedThrow", formattedThrow);
    const playerKey = players[playerIndex];
    setPlayerStats((prevPlayerStats) => ({
      ...prevPlayerStats,
      [playerKey]: setLastThrows(playerStats[playerKey], [
        ...prevPlayerStats[playerKey].lastThrows,
        formattedThrow,
      ]),
    }));
  };

  const setLastThrows = (
    playerStats: PlayerStats,
    lastThrows: string[]
  ): PlayerStats => {
    playerStats.lastThrows = lastThrows;
    return playerStats;
  };

  const updateScoreForPlayerAndContinueGame = (
    playerIndex: number,
    points: number
  ): void => {
    const thrownPoints = points * multiplier;
    const updatedScore = calculateUpdatedScore(playerIndex, thrownPoints);

    const updatedScoreIsInvalid =
      updatedScore < 0 ||
      (props.modeOut === "double" &&
        (multiplier === 1 || multiplier === 3) &&
        updatedScore <= 1) ||
      (multiplier === 2 && updatedScore === 1);

    if (updatedScoreIsInvalid) {
      resetScoreToBeginningOfRound(playerIndex);
      props.switchToNextPlayer();
    } else {
      updatePlayerStatsByThrownPoints(currentPlayerIndex, thrownPoints);
      props.updateRemainingThrows();
      checkIfPlayerHasWon(updatedScore, playerIndex, thrownPoints);
    }

    setMultiplier(1);
  };

  const calculateUpdatedScore = (
    playerIndex: number,
    thrownPoints: number
  ): number => {
    const currentPlayerStats = playerStats[players[playerIndex]];
    const currentPlayerScore = currentPlayerStats.score;
    console.log("currentPlayerScore", currentPlayerScore);
    console.log("thrownPoints", thrownPoints);
    const updatedScore = currentPlayerScore + thrownPoints;

    return updatedScore;
  };

  const checkIfPlayerHasWon = (
    updatedScore: number,
    playerIndex: number,
    thrownPoints: number
  ) => {
    const playerWon =
      updatedScore === 0 && (props.modeOut !== "double" || multiplier === 2);
    if (playerWon) {
      props.cbPlayerHasWon(players[playerIndex]);
      setPlayerStats(
        initializePlayerStats(
          props.players,
          playerStats,
          thrownPoints,
          playerIndex
        )
      );
    }
  };

  const updatePlayerStatsByThrownPoints = (
    playerIndex: number,
    thrownPoints: number
  ): void => {
    const newPoints = calculateNewPlayerStats(
      thrownPoints,
      playerStats[players[playerIndex]]
    );
    // Update player stats
    setPlayerStats((prevPlayerStats) => ({
      ...prevPlayerStats,
      [players[playerIndex]]: newPoints,
    }));

    // Check if someone is killed
    players.map((player, index) => {
      console.log("player", player);
      if (
        players[index] !== players[playerIndex] &&
        playerStats[players[index]].score !== 0
      ) {
        console.log("playerStats[players[playerIndex]].score", newPoints.score);
        console.log(
          "playerStats[players[index]].score",
          playerStats[players[index]].score
        );
        if (newPoints.score === playerStats[players[index]].score) {
          setIsPlayerKilled(true);
          setPlayerKilled(players[index]);
          setPlayerStats((prevPlayerStats) => ({
            ...prevPlayerStats,
            [players[index]]: {
              ...playerStats[players[playerIndex]],
              score: 0,
            },
          }));
        }
      }
    });
  };

  const calculateNewPlayerStats = (
    thrownPoints: number,
    currentPlayerStats: PlayerStats
  ): PlayerStats => ({
    ...currentPlayerStats,
    score: currentPlayerStats.score + thrownPoints,
    totalScore: currentPlayerStats.totalScore + thrownPoints,
    dartsThrown: currentPlayerStats.dartsThrown + 1,
    turns:
      throwsRemaining === 1
        ? currentPlayerStats.turns + 1
        : currentPlayerStats.turns,
    average:
      ((currentPlayerStats.totalScore + thrownPoints) * 3) /
      (currentPlayerStats.dartsThrown + 1),
    checkoutOptions: getAllOptions(3).filter(
      (r) => sumRound(r) === currentPlayerStats.score - thrownPoints
    ),
  });

  const resetScoreToBeginningOfRound = (playerIndex: number) => {
    setPlayerStats((prevPlayerStats) => ({
      ...prevPlayerStats,
      [players[playerIndex]]: resetScore(playerStats[players[playerIndex]]),
    }));
  };

  const resetScore = (playerStats: PlayerStats): PlayerStats => ({
    ...playerStats,
    score: playerStats.scoreAtBeginningOfRound,
  });

  const handleMultiplierClick = (multiplierValue: number): void => {
    setMultiplier(multiplierValue);
  };

  const handleUndoClick = (): void => {
    if (Object.keys(previousPlayerStats).length === 0) return;

    const playerIndex = getIndexOfPlayerFromLastTurn();

    // Check if it's the first dart of the round being undone and round subtraction hasn't occurred yet
    if (
      throwsRemaining === 3 &&
      currentPlayerIndex === 0 &&
      props.currentRound > 1
    ) {
      props.setCurrentRound((currentRound) => currentRound - 1);
    }

    const switchToPrevPlayer =
      playerIndex !== currentPlayerIndex ||
      (throwsRemaining === 3 && players.length === 1);
    if (switchToPrevPlayer) switchToPlayersLastTurn(playerIndex);

    props.setThrowsRemaining(previousPlayerStats.throwsRemaining);

    setPlayerStats((prevPlayerStats) => ({
      ...prevPlayerStats,
      [players[playerIndex]]: {
        ...prevPlayerStats[players[playerIndex]],
        ...previousPlayerStats,
      } as PlayerStats,
    }));
  };

  const getIndexOfPlayerFromLastTurn = (): number => {
    let playerIndex = currentPlayerIndex;
    if (throwsRemaining === 3 && playerIndex != 0) {
      playerIndex--;
    } else if (throwsRemaining === 3) {
      playerIndex = players.length - 1;
    }
    return playerIndex;
  };

  const switchToPlayersLastTurn = (playerIndex: number): void => {
    props.setCurrentPlayerIndex(playerIndex);
    props.setThrowsRemaining(1);
  };

  return (
    <LudoGameView
      currentRound={props.currentRound}
      players={players}
      startingPlayerIndex={props.startingPlayerIndex}
      currentPlayerIndex={currentPlayerIndex}
      playerStats={playerStats}
      playerTotalGameStats={props.playerTotalGameStats}
      cbHandleScoreBtnClicked={handleScoreChange}
      multiplier={multiplier}
      cbHandleMultiplierClicked={handleMultiplierClick}
      cbHandleUndoClicked={handleUndoClick}
      modeOut={props.modeOut}
    />
  );
}

export default LocalLudoGame;
