import { useState } from "react";
import BottomSheet from "../components/BottomSheet/index.jsx";
export default function useBottomSheet() {
  const [bottomSheet, setBottomSheet] = useState({
    element: null,
    nature: null,
    isOpen: false,
  });
  const BottomSheetContent = (nature) => {
    switch (nature) {
      case "Players":
        return <BottomSheet.Players />;
      case "Imposters":
        return <BottomSheet.Imposters />;
      case "TimeLimit":
        return <BottomSheet.TimeLimit />;
      case "Categories":
        return <BottomSheet.Categories />;
      case "Settings":
        return <BottomSheet.Settings />;
      case "Help":
        return <BottomSheet.Help />;
      default:
        return null;
    }
  };
  const ToggleBottomSheet = (nature) =>
    setBottomSheet((preToggle) => ({
      ...preToggle,
      element: BottomSheetContent(nature),
      nature: nature,
      isOpen: nature === preToggle.nature ? !preToggle.isOpen : true,
    }));
  return { bottomSheet, ToggleBottomSheet };
}
