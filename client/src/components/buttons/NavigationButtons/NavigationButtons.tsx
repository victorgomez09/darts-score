export interface NavigationButtonsProps {
  cbBackBtnClicked?(): void;
  cbNextBtnClicked?(): void;
  contentBackBtn?: string;
  contentNextBtn?: string;
  nextBtnDisabled?: boolean;
  marginTop?: number;
  showNextBtn?: boolean;
}

function NavigationButtons(props: NavigationButtonsProps) {
  return (
    <div className={`flex items-center justify-center mt-${props.marginTop ?? 5} mb-2`}>
      {props.cbBackBtnClicked && (
        <button className="btn btn-error m-1" onClick={props.cbBackBtnClicked}>
          {props.contentBackBtn ? props.contentBackBtn : "Back"}
        </button>
      )}
      {(props.showNextBtn ?? true) && props.cbNextBtnClicked && (
        <button
          className="btn btn-success m-1"
          onClick={props.cbNextBtnClicked}
          disabled={props.nextBtnDisabled ?? false}
        >
          {props.contentNextBtn ? props.contentNextBtn : "Next"}
        </button>
      )}
    </div>
  );
}

export default NavigationButtons;
