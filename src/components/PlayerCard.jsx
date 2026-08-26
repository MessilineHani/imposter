import useGame from "../hooks/useGame";
import { useState } from "react";
export default function PlayerCard() {
  const { game, passPlayer } = useGame();
  const { players, currentPlayerIndex } = game;
  const [isToggled, setIsToggled] = useState(false);
  const togglePlayerCard = () => setIsToggled((preToggle) => !preToggle);
  const DefineCardDOM = (isToggled, playerRole, currentWord) => {
    const { word, category, hint } = currentWord;
    if (!isToggled)
      return (
        <button className="cursor-pointer" onClick={togglePlayerCard}>
          tap to reveal
        </button>
      );
    if (playerRole === "imposter")
      return (
        <div>
          <h2>Imposter</h2>
          <p>Hint: {hint}</p>
        </div>
      );
    if (playerRole === "crew")
      return (
        <div>
          <h2>{word}</h2>
          <p>{category}</p>
        </div>
      );
  };
  return (
    <>
      <div className="w-50 h-100 padding-2 rounded-s bg-blue-200 flex justify-evenly items-center flex-col">
        <h3>{players[currentPlayerIndex].name}</h3>
        {DefineCardDOM(
          isToggled,
          players[currentPlayerIndex].role,
          game.currentWord,
        )}
        <p>{`0${currentPlayerIndex + 1} / 0${players.length}`}</p>
      </div>
      {isToggled && (
        <button
          onClick={() => {
            passPlayer();
            togglePlayerCard();
          }}
        >
          Next Player
        </button>
      )}
    </>
  );
}
