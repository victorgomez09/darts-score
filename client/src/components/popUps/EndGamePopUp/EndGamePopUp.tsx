import { EndGamePopUpProps } from "./EndGamePopUp";

function EndGamePopUp(props: EndGamePopUpProps) {

  const getContent = (): JSX.Element => {
    if (props.gameType === "singleplayer") {
      return <span>You have won!</span>;
    } else {
      return (
        <span>
          Player: <strong style={{ fontWeight: "bold" }}>{props.winnerName}</strong> has won this{" "}
          {props.gameType === "tournament" ? "tournament" : "game"}!
        </span>
      );
    }
  };

  return (
    <div className="is-justify-content-center is-align-items-center is-fullheight">
      <div className="modal" style={{ display: "flex", backdropFilter: "blur(2px)" }}>
        <div className="modal-card" style={{ borderRadius: "20px", border: "2px solid grey" }}>
          <section className="modal-card-body pl-0 pr-0" style={{ overflow: "hidden" }}>
            <div className="modal-content is-justify-content-center is-align-items-center" style={{ margin: "0" }}>
              <h1 className={"is-size-3"} style={{ textAlign: "center" }}>
                {getContent()}
              </h1>
            </div>
          </section>
          <section className="modal-card-foot is-justify-content-center is-align-items-center">
            <button className="button is-primary m-1 is-large" onClick={props.cbBtnClicked}>
              End game
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
export default EndGamePopUp;
