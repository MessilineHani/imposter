import { useContext } from "react";
import { GameContext } from "../context/game.context.jsx";
import words from "../assets/words.json";
import { setupInputSchema } from "../utils/zod.js";
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
  const editPlayer = (index, name) => {
    const normalizedName =
      typeof name === "string"
        ? name.trim().replace(/\s+/g, " ").normalize("NFC")
        : "";
    if (!Number.isInteger(index) || !normalizedName) return;
    dispatch({
      type: "EDIT_PLAYER",
      payload: { index, name: normalizedName },
    });
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
  const selectCategory = (category) => {
    const categories = [
      ...new Set(words.map((w) => w.category.toLocaleLowerCase())),
    ];
    if (!categories.includes(category) && category !== "all") return null;
    dispatch({ type: "SELECT_CATEGORY", payload: category });
  };

  const startGame = () => {
    const result = setupInputSchema.safeParse(game);
    if (result.error) {
      const errs = result.error.issues.map((issue) => {
        return {
          message: issue.message,
          source: issue.path,
        };
      });
      return console.log(errs);
    }
    const { random, floor } = Math;
    const totalPlayers = game.players.length;
    // Using a set prevents index repetion
    const imposterIndices = new Set();
    // Using While to repeate to satisfy the condtion under the nature of a set
    while (imposterIndices.size < game.imposterCount) {
      imposterIndices.add(floor(random() * totalPlayers));
      console.log(imposterIndices);
    }
    const newPlayers = game.players.map((p, i) => {
      return {
        ...p,
        role: imposterIndices.has(i) ? "imposter" : "crew",
      };
    });

    const allowedWords = game.selectedCategories.includes("all")
      ? words
      : words.filter((w) =>
          game.selectedCategories.includes(w.category.toLocaleLowerCase()),
        );
    const wordIndex = floor(random() * allowedWords.length);
    dispatch({
      type: "START_GAME",
      payload: { word: allowedWords[wordIndex], players: newPlayers },
    });
  };
  const restart = () => {
    if (game.phase === "reveal") startGame();
  };
  const exit = () => {
    dispatch({ type: "EXIT_GAME" });
  };
  const passPlayer = () => {
    dispatch({ type: "PASS_PLAYER" });
  };

  const reveal = () => {
    dispatch({ type: "REVEAL" });
  };
  return {
    game,
    dispatch,
    addPlayer,
    removePlayer,
    editPlayer,
    setTimeLimit,
    mutateImposterCount,
    selectCategory,
    startGame,
    restart,
    exit,
    passPlayer,
    reveal,
  };
}
