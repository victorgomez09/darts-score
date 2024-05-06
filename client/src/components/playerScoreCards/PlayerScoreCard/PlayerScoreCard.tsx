import { Round } from "../../../helpers/calcCheckouts";
import "../../../styles/Games.css";
import { InAndOutMode } from "../../../types/global";

export interface PlayerScoreCardProps {
  playerName: string;
  isStartingPlayer: boolean;
  isCurrentPlayer: boolean;
  score: number;
  remainingScore?: number;
  average?: number;
  lastThrows: string[];
  checkoutOptions?: Round[];
  sets: number;
  legs: number;
  modeOut?: InAndOutMode;
  disabled?: boolean;
}

function PlayerScoreCard(props: PlayerScoreCardProps) {
  return (
    <div
      className={`column is-full playerCard ${
        props.disabled === true && "inactiveCard"
      }`}
    >
      <div
        className="box"
        style={{ borderLeft: props.isCurrentPlayer ? "5px solid red" : "" }}
      >
        <h1 className={`title is-5 ${props.isStartingPlayer && "red-dot"}`}>
          {props.playerName}
        </h1>
        <div className="is-flex is-align-items-center mb-4">
          <p className="subtitle is-1 m-0" style={{ fontFamily: "sans-serif" }}>
            {props.score}
          </p>
          {props.remainingScore && (
            <p className="m-0 text-sm" style={{ fontFamily: "sans-serif" }}>
              {props.remainingScore}
            </p>
          )}
        </div>
        <div
          className="columns ml-0"
          style={{ minHeight: "24px", display: "block" }}
        >
          {props.lastThrows.map((lastThrow, index) => (
            <div
              key={index}
              className="column pt-0 pb-0 pl-0 pr-2"
              style={{ display: "inline-block" }}
            >
              <p className="is-size-6">{lastThrow}</p>
            </div>
          ))}
        </div>
        {props.average != null && (
          <div className="average-box">
            <p className="subtitle is-6">Ø {props.average.toFixed(2)}</p>
          </div>
        )}
        <table className="table is-bordered mt-3">
          <tbody>
            <tr>
              <th>Sets:</th>
              <td>{props.sets}</td>
              <th>Legs:</th>
              <td>{props.legs}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PlayerScoreCard;
