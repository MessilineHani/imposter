import useGame from "../hooks/useGame";
export default function Reveal() {
  const { exit, restart } = useGame();
  return (
    <div>
      <p>looser</p>
      <button
        className="p-2 m-1 bg-black text-white border rounded-s cursor-pointer"
        onClick={exit}
      >
        Exit
      </button>
      <button
        className="p-2 m-1 bg-black text-white border rounded-s cursor-pointer"
        onClick={restart}
      >
        Restart
      </button>
    </div>
  );
}
