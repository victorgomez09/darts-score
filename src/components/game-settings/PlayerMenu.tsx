import React, { ChangeEvent, useState } from "react";

export interface PlayerMenuProps {
  players: string[];
  maxPlayers: number;
  isEditable: boolean;
  playerCountInfo: string;
  setPlayers?: React.Dispatch<React.SetStateAction<string[]>>;
}

function PlayerMenu({ players, setPlayers, ...props }: PlayerMenuProps) {
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [error, setError] = useState("");

  const onKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addPlayer();
  };

  const addPlayer = () => {
    if (currentPlayer.trim() !== "" && players.length < props.maxPlayers) {
      const truncatedPlayer = currentPlayer.substring(0, 20);

      if (players.includes(truncatedPlayer)) {
        setError("El jugador ya existe!");
        return;
      }
      if (setPlayers) setPlayers([...players, truncatedPlayer]);
      setCurrentPlayer("");
    }
  };

  const deletePlayer = (index: number) => {
    const updatedPlayers = [...players];
    updatedPlayers.splice(index, 1);
    if (setPlayers) setPlayers(updatedPlayers);
    setError("");
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentPlayer(event.target.value);
    setError("");
  };
  return (
    <div className="w-full">
      <h1 className="text-center font-semibold mb-3">Lista de jugadores</h1>
      <ul className="mb-1 mt-4 pr-3 pl-3 playerList">
        {players.map((player, index) => (
          <li key={index}>
            <div className="flex items-center justify-between">
              <div>{player}</div>
              {props.isEditable && (
                <div>
                  <button
                    className="btn btn-sm btn-warning ml-2"
                    onClick={() => deletePlayer(index)}
                  >
                    💩
                  </button>
                </div>
              )}
            </div>
            {index != players.length - 1 && (
              <div className="divider opacity-30 p-0 m-0"></div>
            )}
          </li>
        ))}
      </ul>
      <p className="text-center text-sm font-thin">{props.playerCountInfo}</p>
      {props.isEditable && (
        <div className="mt-4">
          <div className="divider"></div>

          <div className="flex items-center gap-2 flex-1 w-full">
            <input
              className={`input input-bordered w-full ${
                error && "input-error"
              }`}
              type="text"
              value={currentPlayer}
              onChange={handleInputChange}
              onKeyUp={onKeyPressed}
              placeholder="Nombre del jugador"
              disabled={players.length === props.maxPlayers}
            />
            <button
              className="btn btn-primary"
              onClick={addPlayer}
              disabled={players.length === props.maxPlayers}
            >
              Añadir
            </button>
          </div>
          {error && (
            <p className="has-text-danger" style={{ textAlign: "center" }}>
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default PlayerMenu;
