import { useState } from "react";

export function useBottomSheet(nature) {
  console.log(nature);
  const [isOpen, setIsOpen] = useState(false);
  const ToggleBottomSheet = () => setIsOpen((preToggle) => !preToggle);
  return { isOpen, ToggleBottomSheet };
}
