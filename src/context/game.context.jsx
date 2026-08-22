import { createContext, useReducer } from "react";
import reducer from "../services/game.reducer";
export const GameContext = createContext();

/// action => { type: STRING, payload: {} }

export default function GameProvider({ children }) {
  const [game, dispatch] = useReducer(reducer, {
    players: [], // Players Array { name: string, role: "imposter" | "crew" | undefined }
    imposterCount: 1, // Number of Imposters in the game
    phase: "setup", // 0: Lobby, 1: Word Reveal, 2: Discussion, 3: Game Over
    currentWord: {
      word: null, // The secret word for the game
      hint: null, // The hint for the imposter
      category: null, // The game's word Category
    },
    selectedCategories: ["all"], // Categories selected for the game
    timeLimit: 0, // 0 Implies no time limit
    currentPlayerIndex: 0,
  });

  return (
    <GameContext.Provider value={{ game, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}
