import { createContext, useState } from "react";

export const SettingsContext = createContext();

export default function SettingsContextProvider({ children }) {
  const [settings, setSettings] = useState("light");
  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
