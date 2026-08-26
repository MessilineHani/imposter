import { createContext, useReducer } from "react";
import reducer from "../services/game.reducer";
export const GameContext = createContext();

function InitGame(state) {
  return {
    ...state,
    players: [
      { name: "Player 1", role: null },
      { name: "Player 2", role: null },
      { name: "Player 3", role: null },
    ],
    imposterCount: 1,
    phase: "setup",
    selectedCategories: ["all"],
    timeLimit: 0,
  };
}

export default function GameProvider({ children }) {
  const [game, dispatch] = useReducer(
    reducer,
    {
      players: null, // Players Array { name: string, role: "imposter" | "crew" | undefined }
      imposterCount: null, // Number of Imposters in the game
      phase: null, // 0: Lobby, 1: Word Reveal, 2: Discussion, 3: Game Over
      currentWord: {
        word: null, // The secret word for the game
        hint: null, // The hint for the imposter
        category: null, // The game's word Category
      },
      selectedCategories: null, // Categories selected for the game
      timeLimit: null, // 0 Implies no time limit
      currentPlayerIndex: null,
    },
    InitGame,
  );

  return (
    <GameContext.Provider value={{ game, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}
