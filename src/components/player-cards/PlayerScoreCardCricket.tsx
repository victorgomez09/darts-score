import { CricketStatus, CricketStats } from "../../types/playerStats";

export interface PlayerScoreCardCricketProps {
  playerName: string;
  isStartingPlayer: boolean;
  isCurrentPlayer: boolean;
  score: number;
  cricketStats: CricketStats;
  sets: number;
  legs: number;
  disabled?: boolean;
  throwsRemaining: number;
}

const sortTableHeaders = (tableHeaders: string[]) => {
  tableHeaders.sort((a, b) => {
    const sortOrder = (key: string) =>
      key === "Bull" ? -1 : parseInt(key, 10);
    return sortOrder(b) - sortOrder(a);
  });
};

function PlayerScoreCardCricket(props: PlayerScoreCardCricketProps) {
  const tableHeaders: string[] = Object.keys(props.cricketStats);
  sortTableHeaders(tableHeaders);

  const symbolClassNames = {
    0: "",
    1: "slash",
    2: "x",
    3: "x circle",
    4: "closedAll",
  };

  const formatCricketScoreToSymbolClass = (
    cricketStatus: CricketStatus
  ): string => {
    const className = `cell ${symbolClassNames[cricketStatus]}`;
    return className;
  };

  return (
    <div
      id={props.playerName}
      className={`card !shadow bg-base-300 ${
        props.disabled === true && "inactiveCard"
      } ${props.isCurrentPlayer ? "border-l-4 border-l-primary" : ""}`}
    >
      <div className="card-body p-4">
        <h1 className="card-title justify-between items-center">
          <span>{props.playerName}</span>
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
                {" "}
                <g>
                  {" "}
                  <polygon points="98.277,300.352 67.099,300.847 0,367.946 41.002,389.772 114.35,316.424 " />{" "}
                  <path d="M455.606,21.213L434.394,0l-78.241,78.241c-11.074-3.478-23.635-0.91-32.151,8.001 c-16.677,17.451-120.946,126.514-194.235,203.172l27.01,27.01l9.416,9.416c76.658-73.289,185.721-177.558,203.172-194.235 c8.911-8.516,11.479-21.077,8.001-32.151L455.606,21.213z" />{" "}
                  <polygon points="62.472,410.729 87.66,455.606 154.76,388.507 155.254,357.33 135.563,337.638 " />{" "}
                </g>{" "}
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
                {" "}
                <g>
                  {" "}
                  <polygon points="98.277,300.352 67.099,300.847 0,367.946 41.002,389.772 114.35,316.424 " />{" "}
                  <path d="M455.606,21.213L434.394,0l-78.241,78.241c-11.074-3.478-23.635-0.91-32.151,8.001 c-16.677,17.451-120.946,126.514-194.235,203.172l27.01,27.01l9.416,9.416c76.658-73.289,185.721-177.558,203.172-194.235 c8.911-8.516,11.479-21.077,8.001-32.151L455.606,21.213z" />{" "}
                  <polygon points="62.472,410.729 87.66,455.606 154.76,388.507 155.254,357.33 135.563,337.638 " />{" "}
                </g>{" "}
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
                {" "}
                <g>
                  {" "}
                  <polygon points="98.277,300.352 67.099,300.847 0,367.946 41.002,389.772 114.35,316.424 " />{" "}
                  <path d="M455.606,21.213L434.394,0l-78.241,78.241c-11.074-3.478-23.635-0.91-32.151,8.001 c-16.677,17.451-120.946,126.514-194.235,203.172l27.01,27.01l9.416,9.416c76.658-73.289,185.721-177.558,203.172-194.235 c8.911-8.516,11.479-21.077,8.001-32.151L455.606,21.213z" />{" "}
                  <polygon points="62.472,410.729 87.66,455.606 154.76,388.507 155.254,357.33 135.563,337.638 " />{" "}
                </g>{" "}
              </g>
            </svg>
          </div>
        </h1>

        {/* TODO */}
        <div className="flex flex-wrap items-center">
          {tableHeaders.map((header: string, index: number) => (
            <div key={index} className="flex flex-col items-center">
              <span
                key={header}
                style={{ width: "55px" }}
                className="text-center font-semibold"
              >
                {header}
              </span>

              <div
                className={formatCricketScoreToSymbolClass(
                  props.cricketStats[header]
                )}
              />
            </div>
          ))}
        </div>

        {/* <table className="table">
          <thead>
            <tr>
              {tableHeaders.map((header: string) => (
                <th
                  key={header}
                  style={{ width: "55px" }}
                  className="text-center"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {tableHeaders.map((header: string) => (
                <td className="" key={header}>
                  <div
                    className={formatCricketScoreToSymbolClass(
                      props.cricketStats[header]
                    )}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table> */}
        <div className="columns is-centered mb-1 is-flex">
          <p className="subtitle is-2 mb-3">Score: {props.score}</p>
        </div>
        <div className="columns is-centered mb-1 is-flex">
          <table className="table is-bordered mt-3">
            <tbody>
              <tr>
                <th>Sets:</th>
                <td> {props.sets}</td>
                <th>Legs:</th>
                <td> {props.legs}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PlayerScoreCardCricket;
