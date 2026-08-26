export default function reducer(state, action) {
  switch (action.type) {
    case "ADD_PLAYER": {
      if (state.phase !== "setup") return state;
      if (state.players.length >= 15) return state;
      const name =
        typeof action.payload?.name === "string"
          ? action.payload.name.trim()
          : "";
      if (!name) return state;
      return {
        ...state,
        players: [...state.players, { name, role: null }],
      };
    }
    case "REMOVE_PLAYER": {
      if (state.phase !== "setup") return state;
      if (
        !Number.isInteger(action.payload) ||
        action.payload < 0 ||
        action.payload >= state.players.length ||
        state.players.length <= 3
      )
        return state;
      const newPlayers = state.players.filter(
        (player, index) => index !== action.payload,
      );
      const newImposterCount = Math.min(
        state.imposterCount,
        3,
        newPlayers.length - 2,
      );
      return {
        ...state,
        imposterCount: newImposterCount,
        players: newPlayers,
      };
    }
    case "EDIT_PLAYER": {
      if (state.phase !== "setup") return state;

      const { index, name: rawName } = action.payload ?? {};
      if (
        !Number.isInteger(index) ||
        index < 0 ||
        index >= state.players.length ||
        typeof rawName !== "string"
      )
        return state;

      const name = rawName.trim().replace(/\s+/g, " ").normalize("NFC");
      if (!name) return state;

      return {
        ...state,
        players: state.players.map((player, playerIndex) =>
          playerIndex === index ? { ...player, name } : player,
        ),
      };
    }
    case "INC_IMPOSTER":
      if (state.phase !== "setup") return state;
      if (state.imposterCount >= Math.min(3, state.players.length - 2))
        return state;

      return {
        ...state,
        imposterCount: state.imposterCount + 1,
      };
    case "DEC_IMPOSTER":
      if (state.phase !== "setup") return state;
      if (state.imposterCount <= 1) return state;
      return {
        ...state,
        imposterCount: state.imposterCount - 1,
      };
    case "SET_TIME_LIMIT":
      if (state.phase !== "setup") return state;
      if (
        !Number.isFinite(action.payload) ||
        action.payload < 0 ||
        action.payload > 1800
      )
        return state;
      return {
        ...state,
        timeLimit: action.payload,
      };
    case "SELECT_CATEGORY": {
      if (state.phase !== "setup") return state;
      let newSelectedCategories = state.selectedCategories;
      if (action.payload === "all")
        return { ...state, selectedCategories: ["all"] };
      /// Removes the category if clicked twise
      if (state.selectedCategories.includes(action.payload))
        newSelectedCategories = newSelectedCategories.filter(
          (c) => c !== action.payload,
        );
      ///
      /// Add the selected Category
      else
        newSelectedCategories = [
          ...newSelectedCategories.filter((c) => c !== "all"),
          action.payload,
        ];
      ////
      if (newSelectedCategories.length === 0) newSelectedCategories = ["all"];
      return {
        ...state,
        selectedCategories: newSelectedCategories,
      };
    }
    case "START_GAME": {
      if (state.phase !== "setup" && state.phase !== "reveal") return state;
      return {
        ...state,
        phase: "passing",
        players: action.payload.players,
        currentWord: action.payload.word,
        currentPlayerIndex: 0,
      };
    }
    case "PASS_PLAYER":
      if (state.phase !== "passing") return state;

      if (state.currentPlayerIndex >= state.players.length - 1) {
        return { ...state, phase: "discussion" };
      }

      return {
        ...state,
        currentPlayerIndex: state.currentPlayerIndex + 1,
      };
    case "REVEAL":
      if (state.phase !== "discussion") return state;
      return {
        ...state,
        phase: "reveal",
      };
    case "EXIT_GAME":
      if (state.phase !== "reveal") return state;
      return {
        ...state,
        phase: "setup",
        players: state.players.map((player) => ({
          ...player,
          role: null,
        })),
        currentWord: {
          word: null,
          hint: null,
          category: null,
        },
        currentPlayerIndex: null,
      };
    default:
      return state;
  }
}
