import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import './main.css';
import App from "./pages/App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
  </BrowserRouter>
);
