import { useNavigate } from "react-router-dom";

function MainMenu() {
  const navigate = useNavigate();

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content w-full">
        <div className="card !shadow bg-base-100 w-8/12">
          <div className="card-body">
            <h3 className="card-title justify-center">Dardos VIRA</h3>
            <div className="flex flex-col items-center gap-4">
              <button
                className="btn btn-primary btn-block"
                onClick={() => navigate("/singleplayer")}
              >
                Un jugador
              </button>
              <button
                className="btn btn-primary btn-block"
                onClick={() => navigate("/multiplayer")}
              >
                Multijugador
              </button>
              <button
                className="btn btn-primary btn-block"
                onClick={() => navigate("/tournament")}
              >
                Torneo
              </button>
              <button
                className="btn btn-primary btn-block"
                onClick={() => navigate("/settings")}
              >
                Ajustes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainMenu;
