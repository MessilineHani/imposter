import { useContext, useState } from "react";
import { SettingsContext } from "../context/settings.context.jsx";
import useGame from "./useGame.jsx";
import { settingsSchema } from "../utils/zod.js";
import i18n from "../utils/i18n.js";
export default function useSettings() {
  const { settings, setSettings } = useContext(SettingsContext);
  const { game } = useGame();
  // Keep edits local until the complete settings object passes validation.
  const [draft, setDraft] = useState(settings);
  const updateDraft = (key, value) => {
    if (game.phase !== "setup") return;
    const validKeys = ["language", "theme", "wordRepeat", "music", "sound"];
    const languageOptions = ["en", "ar", "fr"];
    const validThemes = ["light", "dark"];
    if (!validKeys.includes(key)) return;
    if (key === "language" && !languageOptions.includes(value)) return;
    if (key === "theme" && !validThemes.includes(value)) return;
    if (
      typeof value !== "boolean" &&
      (key === "wordRepeat" || key === "music" || key === "sound")
    )
      return;
    setDraft((prevDraft) => ({
      ...prevDraft,
      [key]: value,
    }));
  };
  const saveSettings = () => {
    if (game.phase !== "setup") return;
    const result = settingsSchema.safeParse(draft);
    if (!result.success) {
      const errs = result.error.issues.map((issue) => {
        return {
          message: issue.message,
          source: issue.path,
        };
      });
      return errs;
    }
    setSettings(result.data);
    setDraft(result.data);
    i18n.changeLanguage(result.data.language);
  };
  const resetDraft = () => {
    setDraft(settings);
  };
  return { settings, draft, updateDraft, saveSettings, resetDraft };
}
