export interface GameInputButtonsProps {
  values: number[];
  cbHandleButtonClicked(number: number): void;
  showMissButton: boolean;
  btnSize: number;
  disabled?: boolean;
}

function GameInputButtons(props: GameInputButtonsProps) {
  return (
      <div className="flex flex-row flex-wrap items-center">
        {props.values.map((number) => (
          <button
            key={number}
            className="btn btn-info m-1"
            onClick={() => props.cbHandleButtonClicked(number + 1)}
            style={{ width: `${props.btnSize}px` }}
            disabled={props.disabled}
          >
            {number + 1}
          </button>
        ))}
        {props.showMissButton && (
          <button
            key={"Miss"}
            className="btn btn-error m-1"
            onClick={() => props.cbHandleButtonClicked(0)}
            style={{ width: `${props.btnSize}px` }}
            disabled={props.disabled}
          >
            Miss
          </button>
        )}
      </div>
  );
}
export default GameInputButtons;
