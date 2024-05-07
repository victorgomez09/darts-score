import { useEffect } from "react";

export interface GameMultiplierButtonsProps {
  cbHandleMultiplierClicked(multiplier: number): void;
  multiplier: number;
  disabled?: boolean;
}

function GameMultiplierButtons(props: GameMultiplierButtonsProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const validMultiplier = ["1", "2", "3"].includes(event.key);
      if (validMultiplier) props.cbHandleMultiplierClicked(Number(event.key));
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [props]);

  const isCurrentlySelected = (multiplier: number): boolean => {
    return props.multiplier === multiplier;
  };

  return (
    <div className="flex items-center justify-center">
      <button
        className={`btn btn-info m-1 ${
          isCurrentlySelected(1) && !props.disabled
            ? "!btn-active font-bold text-base-content"
            : ""
        }`}
        onClick={() => props.cbHandleMultiplierClicked(1)}
        disabled={props.disabled}
      >
        Single
      </button>
      <button
        className={`btn btn-success m-1 ${
          isCurrentlySelected(2) && !props.disabled
            ? "!btn-active font-bold text-base-content"
            : ""
        }`}
        onClick={() => props.cbHandleMultiplierClicked(2)}
        disabled={props.disabled}
      >
        Double
      </button>
      <button
        className={`btn btn-warning m-1 ${
          isCurrentlySelected(3) && !props.disabled
            ? "!btn-active font-bold text-base-content"
            : ""
        }`}
        onClick={() => props.cbHandleMultiplierClicked(3)}
        disabled={props.disabled}
      >
        Triple
      </button>
    </div>
  );
}

export default GameMultiplierButtons;
