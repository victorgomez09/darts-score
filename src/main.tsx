import ReactDOM from "react-dom/client";

import "./main.css";
import App from "./pages/App.tsx";
import { HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <HashRouter>
        <App />
    </HashRouter>
);
