import useGame from "../../hooks/useGame";

export default function TimeLimit() {
  const { game, setTimeLimit } = useGame();
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-medium text-gray-900">
        current time limit {game.timeLimit / 60}mins
      </h2>

      <form onSubmit={setTimeLimit} className="flex flex-col gap-2">
        <label
          htmlFor="time-limit"
          className="text-sm font-medium text-gray-700"
        >
          Time Limit in minutes
        </label>
        <input
          type="number"
          id="time-limit"
          name="timeLimit"
          className="block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter time limit in minutes"
        />
        <button
          type="submit"
          className="p-2 cursor-pointer bg-blue-500 text-white rounded-md mt-2"
        >
          Set time limit
        </button>
      </form>
    </div>
  );
}
