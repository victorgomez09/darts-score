import { useEffect, useState } from "react";
import { GameType, Gamemode, InAndOutMode } from "../../types/global.ts";
import { PlayerToPlayerTotalGameStats } from "../../types/playerStats.ts";
import NavigationButtons from "../buttons/NavigationButtons.tsx";
import LocalCricketGame from "../engine/local/LocalCricketGame.tsx";
import LocalLudoGame from "../engine/local/LocalLudoGame.tsx";
import LocalRoundTheClockGame from "../engine/local/LocalRoundTheClockGame.tsx";
import LocalStandardGames from "../engine/local/LocalStandardGames.tsx";

export interface LocalGamesProps {
  selectedGamemode: Gamemode;
  players: string[];
  cbBackBtnClicked(): void;
  setsToWin: number;
  legsForSet: number;
  modeIn: InAndOutMode;
  modeOut: InAndOutMode;
  gameType: GameType;
  cbPlayerWon?(player: string): void;
}

const initializePlayerTotalGameStats = (
  players: string[]
): PlayerToPlayerTotalGameStats => {
  const initialStats: PlayerToPlayerTotalGameStats = {};
  players.forEach((player) => {
    initialStats[player] = {
      sets: 0,
      legs: 0,
    };
  });
  return initialStats;
};

function LocalGames(props: LocalGamesProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_showGoToMainMenuPopUp, setShowGoToMainMenuPopUp] =
    useState<boolean>(false);
  const [playerTotalGameStats, setPlayerTotalGameStats] =
    useState<PlayerToPlayerTotalGameStats>(() =>
      initializePlayerTotalGameStats(props.players)
    );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_winningPlayer, setWinningPlayer] = useState<string | null>(null);
  const [throwsRemaining, setThrowsRemaining] = useState<number>(3);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [startingPlayerOfSetIndex, setStartingPlayerOfSetIndex] =
    useState<number>(0);
  const [startingPlayerIndex, setStartingPlayerIndex] = useState<number>(
    startingPlayerOfSetIndex
  );
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(
    startingPlayerOfSetIndex
  );
  const [turns, setTurns] = useState<number>(0);

  const updateGameStatsForWinningPlayer = (playerKey: string): void => {
    let currentLegs = playerTotalGameStats[playerKey].legs + 1;
    let currentSets = playerTotalGameStats[playerKey].sets;
    if (currentLegs === Number(props.legsForSet)) {
      currentSets++;
      currentLegs = 0;
      resetRoundStatsForNewSet();
    } else {
      resetRoundStatsForNextGame();
    }

    setPlayerTotalGameStats((prevPlayerTotalGameStats) => ({
      ...prevPlayerTotalGameStats,
      [playerKey]: {
        ...prevPlayerTotalGameStats[playerKey],
        legs: currentLegs,
        sets: currentSets,
      },
    }));

    if (currentSets === Number(props.setsToWin)) {
      handlePlayerWon(playerKey);
    }
  };

  const handlePlayerWon = (playerKey: string) => {
    if (props.cbPlayerWon) {
      props.cbPlayerWon(playerKey);
    } else {
      setWinningPlayer(playerKey);
    }
  };

  const resetRoundStatsForNewSet = () => {
    const updatedStartingPlayerOfSetIndex =
      (startingPlayerOfSetIndex + 1) % props.players.length;
    setStartingPlayerOfSetIndex(updatedStartingPlayerOfSetIndex);
    resetRoundStats(updatedStartingPlayerOfSetIndex);
  };

  const resetRoundStatsForNextGame = () => {
    const updatedStartingPlayerIndex =
      (startingPlayerIndex + 1) % props.players.length;
    resetRoundStats(updatedStartingPlayerIndex);
  };

  const resetRoundStats = (startingPlayerIndex: number) => {
    setStartingPlayerIndex(startingPlayerIndex);
    setCurrentPlayerIndex(startingPlayerIndex);
    setCurrentRound(1);
    setThrowsRemaining(3);
  };

  const updateRemainingThrows = (): void => {
    setThrowsRemaining((throwsRemaining) => throwsRemaining - 1);
    if (throwsRemaining === 1) {
      switchToNextPlayer();
      setThrowsRemaining(3);
    }
  };

  const switchToNextPlayer = (): void => {
    setCurrentPlayerIndex(
      (currentPlayerIndex) => (currentPlayerIndex + 1) % props.players.length
    );
    setTurns((turns) => turns + 1);
    if (turns === props.players.length - 1) {
      setCurrentRound((currentRound) => currentRound + 1);
      setTurns(0);
    }
    setThrowsRemaining(3);
  };

  const gameProps = {
    players: props.players,
    playerTotalGameStats: playerTotalGameStats,
    setsToWin: props.setsToWin,
    legsForSet: props.legsForSet,
    cbPlayerHasWon: updateGameStatsForWinningPlayer,
    throwsRemaining: throwsRemaining,
    currentRound: currentRound,
    startingPlayerIndex: startingPlayerIndex,
    currentPlayerIndex: currentPlayerIndex,
    switchToNextPlayer: switchToNextPlayer,
    updateRemainingThrows: updateRemainingThrows,
  };

  const standardGamesProps = {
    modeIn: props.modeIn,
    modeOut: props.modeOut,
    setThrowsRemaining: setThrowsRemaining,
    setCurrentPlayerIndex: setCurrentPlayerIndex,
    setCurrentRound: setCurrentRound,
  };

  const cricketGameProps = {
    setThrowsRemaining: setThrowsRemaining,
    setCurrentPlayerIndex: setCurrentPlayerIndex,
    setCurrentRound: setCurrentRound,
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleBeforeUnload = (event: any) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center p-2 w-full h-full">
      {/* <GameInformationHeader
        throwsRemaining={throwsRemaining}
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
      /> */}
      {props.selectedGamemode === "301" && (
        <LocalStandardGames
          {...gameProps}
          {...standardGamesProps}
          throwsRemaining={throwsRemaining}
          gamemodeTotalScore={301}
        />
      )}
      {props.selectedGamemode === "501" && (
        <LocalStandardGames
          {...gameProps}
          {...standardGamesProps}
          throwsRemaining={throwsRemaining}
          gamemodeTotalScore={501}
        />
      )}
      {props.selectedGamemode === "rcl" && (
        <LocalRoundTheClockGame {...gameProps} />
      )}
      {props.selectedGamemode === "cri" && (
        <LocalCricketGame {...gameProps} {...cricketGameProps} />
      )}
      {props.selectedGamemode === "ludo" && (
        <LocalLudoGame
          {...gameProps}
          {...standardGamesProps}
          throwsRemaining={throwsRemaining}
        />
      )}

      <NavigationButtons
        cbBackBtnClicked={() => setShowGoToMainMenuPopUp(true)}
        marginTop={0}
      />
    </div>
  );
}

export default LocalGames;
