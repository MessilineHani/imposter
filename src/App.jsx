import "./App.css";
import { ThemeContext } from "./context/theme.context";
import { useContext } from "react";
import Home from "./pages/Home";
export default function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen flex items-center flex-col justify-center ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}
    >
      <Home />
    </div>
  );
}
