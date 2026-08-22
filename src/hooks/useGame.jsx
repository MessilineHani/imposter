import { useContext } from "react";
import { GameContext } from "../context/game.context.jsx";

export default function useGame() {
  const { game, dispatch } = useContext(GameContext);
  const addPlayer = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let name = formData.get("playerName");
    name = name.trim();
    if (!name) return alert("Player name cannot be empty");
    dispatch({ type: "ADD_PLAYER", payload: { name: name, role: undefined } });
  };
  const removePlayer = (index) => {
    dispatch({ type: "REMOVE_PLAYER", payload: index });
  };
  const setTimeLimit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const timeLimit = formData.get("timeLimit");
    dispatch({ type: "SET_TIME_LIMIT", payload: parseFloat(timeLimit) });
  };
  const mutateImposterCount = (action) => {
    const actionType =
      action === "inc"
        ? "INC_IMPOSTER"
        : action === "dec"
          ? "DEC_IMPOSTER"
          : null;
    if (actionType) dispatch({ type: actionType });
  };
  return {
    game,
    dispatch,
    addPlayer,
    removePlayer,
    setTimeLimit,
    mutateImposterCount,
  };
}
