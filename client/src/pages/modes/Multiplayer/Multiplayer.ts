import { Socket } from "socket.io-client";

export interface MultiplayerProps {
  socket: Socket;
  displayUserID: string;
  isLoggedIn: boolean;
}
