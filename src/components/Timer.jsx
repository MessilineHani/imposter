import useGame from "../hooks/useGame";
import { useState, useEffect } from "react";
export default function Timer() {
  const { game, reveal } = useGame();
  const [timeLimit, setTimeLimit] = useState(() => game.timeLimit);

  useEffect(() => {
    if (!game.timeLimit) return;

    const interval = setInterval(() => {
      setTimeLimit((prevTL) => Math.max(prevTL - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [game.timeLimit]);

  useEffect(() => {
    if (game.timeLimit && timeLimit === 0) reveal();
  }, [game.timeLimit, timeLimit, reveal]);

  if (!game.timeLimit) return null;

  return <div>{timeLimit > 0 ? timeLimit : null}</div>;
}
