import useGame from "../hooks/useGame";
export default function Discussion({ children }) {
  const { game, reveal } = useGame();
  const startingPlayer =
    game.players[Math.floor(Math.random() * game.players.length)].name;
  return (
    <>
      <h2>Discussion</h2>
      <p>{startingPlayer} Starts the conversation</p>
      {children}
      <button className="p-2 cursor-pointer" onClick={reveal}>
        Reveal
      </button>
    </>
  );
}
