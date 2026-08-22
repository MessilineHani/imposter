import useGame from "../../hooks/useGame";

export default function Players() {
  const { game, addPlayer, removePlayer } = useGame();
  const playersElements = game.players?.map((p, i) => {
    return (
      <div key={i} className="flex justify-between items-center">
        <div className="text-l font-normal text-center text-blue-600 capitalize">
          {p.name}
        </div>
        <button
          className="text-l font-normal text-center text-red-800 cursor-pointer p-3 border capitalize"
          type="button"
          onClick={() => removePlayer(i)}
        >
          remove
        </button>
      </div>
    );
  });
  return (
    <>
      <form onSubmit={addPlayer} className="flex flex-col gap-2">
        <input type="text" name="playerName" placeholder="Enter Player name" />
        {game.error && <p className="text-red-500">{game.error}</p>}
        <button
          type="submit"
          className="border p-2 rounded-lg cursor-pointer hover:bg-gray-500 hover:text-white"
        >
          Add Player
        </button>
      </form>
      <div className="players">{playersElements}</div>
    </>
  );
}
