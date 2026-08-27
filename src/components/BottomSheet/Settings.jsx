import useSettings from "../../hooks/useSettings.jsx";

export default function Settings() {
  const { draft, updateDraft, saveSettings, resetDraft } = useSettings();

  return (
    <div className="flex flex-col gap-2 p-4">
      <label>
        Language
        <select
          value={draft.language}
          onChange={(event) => updateDraft("language", event.target.value)}
        >
          <option value="en">English</option>
          <option value="ar">Arabic</option>
          <option value="fr">French</option>
        </select>
      </label>

      <label>
        Theme
        <select
          value={draft.theme}
          onChange={(event) => updateDraft("theme", event.target.value)}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>

      <label>
        <input
          type="checkbox"
          checked={draft.wordRepeat}
          onChange={(event) => updateDraft("wordRepeat", event.target.checked)}
        />
        Repeat words
      </label>

      <label>
        <input
          type="checkbox"
          checked={draft.music}
          onChange={(event) => updateDraft("music", event.target.checked)}
        />
        Music
      </label>

      <label>
        <input
          type="checkbox"
          checked={draft.sound}
          onChange={(event) => updateDraft("sound", event.target.checked)}
        />
        Sound
      </label>

      <button
        className="bg-blue-500 text-white p-2 rounded"
        type="button"
        onClick={saveSettings}
      >
        Save settings
      </button>
      <button
        className="bg-gray-500 text-white p-2 rounded"
        type="button"
        onClick={resetDraft}
      >
        Reset draft
      </button>
    </div>
  );
}
