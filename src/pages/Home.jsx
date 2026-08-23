import BottomSheet from "../components/BottomSheet/index.jsx";
import useBottomSheet from "../hooks/useBottomSheet.jsx";
export default function Home() {
  const { bottomSheet, ToggleBottomSheet } = useBottomSheet();
  const bottomSheetElements = [
    "Players",
    "Imposters",
    "TimeLimit",
    "Categories",
    "Settings",
    "Help",
  ];
  const bottomSheetButtonsDOM = bottomSheetElements.map((element) => {
    return (
      <button
        key={element}
        className="bg-blue-500 m-1 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => ToggleBottomSheet(element)}
      >
        {element}
      </button>
    );
  });

  return (
    <>
      <h1 className="text-2xl font-normal text-center text-green-500">
        Welcome to the Home Page
      </h1>
      {bottomSheetButtonsDOM}
      <BottomSheet>{bottomSheet.isOpen && bottomSheet.element}</BottomSheet>
    </>
  );
}
