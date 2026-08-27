import { createContext, useState } from "react";

export const SettingsContext = createContext();

export default function SettingsContextProvider({ children }) {
  const [settings, setSettings] = useState({
    language: "en",
    theme: "light",
    wordRepeat: false,
    music: true,
    sound: true,
  });
  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
