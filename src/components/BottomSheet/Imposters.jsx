import useGame from "../../hooks/useGame";

export default function Imposters() {
  const { game, mutateImposterCount } = useGame();
  return (
    <>
      <div className="flex flex-row justify-evenly align-center">
        <button
          className="cursor-pointer"
          id="dec"
          onClick={() => mutateImposterCount("dec")}
        >
          Minus
        </button>
        <div>{game.imposterCount}</div>
        <button
          className="cursor-pointer"
          id="inc"
          onClick={() => mutateImposterCount("inc")}
        >
          Plus
        </button>
      </div>
    </>
  );
}
