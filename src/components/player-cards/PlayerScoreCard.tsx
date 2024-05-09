import { Round } from "../../helpers/calcCheckouts";
import { InAndOutMode } from "../../types/global";

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
  throwsRemaining: number;
}

function PlayerScoreCard(props: PlayerScoreCardProps) {
  return (
    <div
      id={props.playerName}
      className={`card bg-base-200 !shadow ${
        props.disabled === true && "bg-base-300"
      } ${props.isCurrentPlayer ? "border-l-4 border-l-primary" : ""}`}
    >
      <div className="card-body p-5">
        <h1 className="card-title">{props.playerName}</h1>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <p className="font-bold text-3xl m-0">{props.score}</p>
            {props.remainingScore && (
              <p className="m-0 text-sm">/ {props.remainingScore}</p>
            )}
          </div>

          <div className="flex items-center">
            <svg
              className={`h-6 w-6 text-base-content ${
                props.throwsRemaining <= 2 ? "opacity-30" : ""
              }`}
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 455.606 455.606"
              transform="rotate(180)"
            >
              <g strokeWidth="0" />
              <g strokeLinecap="round" strokeLinejoin="round" />
              <g>
                <g>
                  <polygon points="98.277,300.352 67.099,300.847 0,367.946 41.002,389.772 114.35,316.424 " />
                  <path d="M455.606,21.213L434.394,0l-78.241,78.241c-11.074-3.478-23.635-0.91-32.151,8.001 c-16.677,17.451-120.946,126.514-194.235,203.172l27.01,27.01l9.416,9.416c76.658-73.289,185.721-177.558,203.172-194.235 c8.911-8.516,11.479-21.077,8.001-32.151L455.606,21.213z" />{" "}
                  <polygon points="62.472,410.729 87.66,455.606 154.76,388.507 155.254,357.33 135.563,337.638 " />
                </g>
              </g>
            </svg>

            <svg
              className={`h-6 w-6 text-base-content ${
                props.throwsRemaining <= 1 ? "opacity-30" : ""
              }`}
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 455.606 455.606"
              transform="rotate(180)"
            >
              <g strokeWidth="0" />
              <g strokeLinecap="round" strokeLinejoin="round" />
              <g>
                <g>
                  <polygon points="98.277,300.352 67.099,300.847 0,367.946 41.002,389.772 114.35,316.424 " />
                  <path d="M455.606,21.213L434.394,0l-78.241,78.241c-11.074-3.478-23.635-0.91-32.151,8.001 c-16.677,17.451-120.946,126.514-194.235,203.172l27.01,27.01l9.416,9.416c76.658-73.289,185.721-177.558,203.172-194.235 c8.911-8.516,11.479-21.077,8.001-32.151L455.606,21.213z" />{" "}
                  <polygon points="62.472,410.729 87.66,455.606 154.76,388.507 155.254,357.33 135.563,337.638 " />
                </g>
              </g>
            </svg>

            <svg
              className={`h-6 w-6 text-base-content ${
                props.throwsRemaining == 0 ? "opacity-30" : ""
              }`}
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 455.606 455.606"
              transform="rotate(180)"
            >
              <g strokeWidth="0" />
              <g strokeLinecap="round" strokeLinejoin="round" />
              <g>
                <g>
                  <polygon points="98.277,300.352 67.099,300.847 0,367.946 41.002,389.772 114.35,316.424 " />
                  <path d="M455.606,21.213L434.394,0l-78.241,78.241c-11.074-3.478-23.635-0.91-32.151,8.001 c-16.677,17.451-120.946,126.514-194.235,203.172l27.01,27.01l9.416,9.416c76.658-73.289,185.721-177.558,203.172-194.235 c8.911-8.516,11.479-21.077,8.001-32.151L455.606,21.213z" />{" "}
                  <polygon points="62.472,410.729 87.66,455.606 154.76,388.507 155.254,357.33 135.563,337.638 " />
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-0">
          <svg
            className="h-4 w-4 text-base-content"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 455.606 455.606"
            transform="rotate(180)"
          >
            <g strokeWidth="0" />
            <g strokeLinecap="round" strokeLinejoin="round" />
            <g>
              <g>
                <polygon points="98.277,300.352 67.099,300.847 0,367.946 41.002,389.772 114.35,316.424 " />
                <path d="M455.606,21.213L434.394,0l-78.241,78.241c-11.074-3.478-23.635-0.91-32.151,8.001 c-16.677,17.451-120.946,126.514-194.235,203.172l27.01,27.01l9.416,9.416c76.658-73.289,185.721-177.558,203.172-194.235 c8.911-8.516,11.479-21.077,8.001-32.151L455.606,21.213z" />{" "}
                <polygon points="62.472,410.729 87.66,455.606 154.76,388.507 155.254,357.33 135.563,337.638 " />
              </g>
            </g>
          </svg>

          <div className="flex items-center">
            {props.lastThrows.map((lastThrow, index) => (
              <div
                className={`badge badge-info m-1 ${
                  lastThrow.includes("D") ? "!badge-success" : ""
                } ${lastThrow.includes("T") ? "!badge-warning" : ""}`}
                key={index}
              >
                <p>{lastThrow}</p>
              </div>
            ))}
          </div>
        </div>
        {props.average != null && (
          <div className="flex items-center gap-2">
            <svg
              className="h-4 w-4 text-base-content"
              viewBox="0 0 15 15"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g strokeWidth="0" />
              <g strokeLinecap="round" strokeLinejoin="round" />
              <g>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM7.00003 1.84861C4.10114 2.1017 1.82707 4.53515 1.82707 7.49972C1.82707 10.4643 4.10114 12.8977 7.00003 13.1508V1.84861ZM8.00003 13.1508C10.8988 12.8976 13.1727 10.4642 13.1727 7.49972C13.1727 4.53524 10.8988 2.10185 8.00003 1.84864V13.1508Z"
                />
              </g>
            </svg>

            <p>{props.average.toFixed(2)}</p>
          </div>
        )}
        <table className="table mt-3">
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
