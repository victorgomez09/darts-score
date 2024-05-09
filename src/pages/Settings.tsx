import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlayerScoreCard from "../components/player-cards/PlayerScoreCard";

export const DART_THEME = "darts-theme";
const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
];

function Settings() {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState<string>(
    localStorage.getItem(DART_THEME) || "default"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", selectedTheme);
    localStorage.setItem(DART_THEME, selectedTheme);
  }, [selectedTheme]);

  const backBtnClicked = () => navigate("/");

  return (
    <div className="flex flex-1 items-center justify-center w-full h-full">
      <div className="card bg-base-100 w-8/12">
        <div className="card-body p-4">
          <div className="flex flex-col flex-wrap items-center justify-center gap-2">
            <div className="flex items-center justify-center gap-2">
              Tema seleccionado:{" "}
              <span className="font-semibold italic">{`${selectedTheme
                .charAt(0)
                .toUpperCase()}${selectedTheme.slice(1)}`}</span>
              <div className="dropdown">
                <div tabIndex={0} role="button" className="btn m-1">
                  Cambialo aqui
                  <svg
                    width="12px"
                    height="12px"
                    className="h-2 w-2 fill-current opacity-60 inline-block"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 2048 2048"
                  >
                    <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] p-2 h-60 shadow-2xl bg-base-300 rounded-box w-52 overflow-auto"
                >
                  {themes.map((theme) => (
                    <li key={theme}>
                      <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                        aria-label={`${theme
                          .charAt(0)
                          .toUpperCase()}${theme.slice(1)}`}
                        value={theme}
                        onChange={() => setSelectedTheme(theme)}
                        checked={selectedTheme === theme}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <PlayerScoreCard
              playerName="Ejemplo"
              isStartingPlayer
              isCurrentPlayer
              score={33}
              lastThrows={["T20", "9", "D12"]}
              sets={1}
              legs={2}
              throwsRemaining={3}
            />
          </div>

          <button className="btn btn-error mt-4" onClick={backBtnClicked}>
            Atrás
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
