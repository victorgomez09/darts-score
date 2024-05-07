import { useNavigate } from "react-router-dom";
import NavigationButtons from "../../components/buttons/NavigationButtons.tsx";
import { MultiplayerMode } from "../../types/global.ts";

export interface MultiplayerModeProps {
  cbMultiplayerModeSelected(multiplayerMode: MultiplayerMode): void;
}

function MultiplayerMenu(props: MultiplayerModeProps) {
  const navigate = useNavigate();

  const handleMenuClick = (mode: MultiplayerMode) => {
    props.cbMultiplayerModeSelected(mode);
  };

  return (
    <div className="hero is-justify-content-center is-align-items-center is-fullheight">
      <div className="hero-body">
        <div className="container box">
          <div className="column is-flex is-justify-content-center">
            <h1 className="is-size-4 mb-3">Choose Mulitplayer Mode</h1>
          </div>
          <div className="buttons is-centered">
            <button
              className="button is-primary m-1 is-large is-fullwidth"
              onClick={() => handleMenuClick("local")}
            >
              Local Multiplayer
            </button>
          </div>
          <NavigationButtons cbBackBtnClicked={() => navigate("/")} />
        </div>
      </div>
    </div>
  );
}

export default MultiplayerMenu;
