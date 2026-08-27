import "./App.css";
import Home from "./pages/Home";
import Roles from "./pages/Roles";
import Discussion from "./pages/Discussion";
import useGame from "./hooks/useGame";
import useSettings from "./hooks/useSettings";
import Timer from "./components/Timer";
import Reveal from "./pages/Reveal";
function DefineAppDOM(phase) {
  switch (phase) {
    case "setup":
      return <Home />;
    case "passing":
      return <Roles />;
    case "discussion":
      return (
        <Discussion>
          <Timer />
        </Discussion>
      );
    case "reveal":
      return <Reveal />;
    default:
      return <Home />;
  }
}
export default function App() {
  const { game } = useGame();
  const { settings } = useSettings();
  const appDOM = DefineAppDOM(game.phase);
  return (
    <div
      className={`min-h-screen flex items-center flex-col justify-center ${settings.theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}
    >
      {appDOM}
    </div>
  );
}
