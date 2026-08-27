import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ThemeProvider from "./context/theme.context.jsx";
import GameProvider from "./context/game.context.jsx";
import SettingsProvider from "./context/settings.context.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SettingsProvider>
      <ThemeProvider>
        <GameProvider>
          <App />
        </GameProvider>
      </ThemeProvider>
    </SettingsProvider>
  </StrictMode>,
);
