import { useContext, useRef } from "react";
import { ThemeContext } from "../context/theme.context.jsx";
import { GameContext } from "../context/game.context.jsx";
import BottomSheet from "../components/BottomSheet/index.jsx";

export default function Home() {
  // const { game, dispatch } = useContext(GameContext);

  return (
    <>
      <h1 className="text-2xl font-normal text-center text-green-500">
        Welcome to the Home Page
      </h1>
      <BottomSheet>
        {/* <BottomSheet.Players />
        <BottomSheet.Imposters />
        <BottomSheet.TimeLimit /> */}
        <BottomSheet.Categories />
      </BottomSheet>
    </>
  );
}
