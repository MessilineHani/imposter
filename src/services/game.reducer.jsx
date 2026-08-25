
export default function reducer(state, action) {
  switch (action.type) {
    case "ADD_PLAYER": {
      if (state.players.length >= 15) return state;
      const newPlayers = [...state.players, action.payload]
      return {
        ...state,
        players: newPlayers,
      };
    }
    case "REMOVE_PLAYER": {
      const newPlayers = state.players.filter(
        (player, index) => index !== action.payload,
      );
      let newImposterCount = state.imposterCount;
      if (
        newPlayers.length <= 10 &&
        newPlayers.length > 5 &&
        state.imposterCount > 2
      )
        newImposterCount = 2;
      if (newPlayers.length <= 5 && state.imposterCount > 1)
        newImposterCount = 1;
      return {
        ...state,
        imposterCount: newImposterCount,
        players: newPlayers,
      };
    }
    case "INC_IMPOSTER":
      if (state.imposterCount + 1 > 3) return state;
      if (state.players.length <= 5) return state;
      if (state.players.length <= 10 && state.imposterCount + 1 > 2)
        return state;

      return {
        ...state,
        imposterCount: state.imposterCount + 1,
      };
    case "DEC_IMPOSTER":
      if (state.imposterCount - 1 <= 0) return state;
      if (state.imposterCount - 1 >= state.players.length - 2) return state;
      return {
        ...state,
        imposterCount: state.imposterCount - 1,
      };
    case "SET_TIME_LIMIT":
      return {
        ...state,
        timeLimit: action.payload,
      };
    case "SELECT_CATEGORY": {
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
      return {
        ...state,
        phase: "passing",
        players: action.payload.players,
        currentWord: action.payload.word,
        currentPlayerIndex: 0,
      };
    }
    default:
      return state;
  }
}
