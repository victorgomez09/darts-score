import { PlayerToPlayerTotalGameStats } from "../../types/playerStats";

export interface OnlineGameProps {
  playerTotalGameStats: PlayerToPlayerTotalGameStats;
  currentRound: number;
  players: DPlayer[];
  throwsRemaining: number;
  startingPlayerIndex: number;
  currentPlayerIndex: number;
}

export interface DPlayer {
  userID: string;
  isLeader: boolean;
  isActive: boolean;
}