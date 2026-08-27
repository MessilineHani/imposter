# Data Flow

## Game Flow

```mermaid
flowchart TD
	User[User action] --> Component[Page or component]
	Component --> Hook[useGame]
	Words[words.json] --> Hook
	Hook -->|prepared action| Dispatch[GameContext dispatch]
	Dispatch --> Reducer[Pure game reducer]
	Reducer --> State[Updated game state]
	State --> App[App phase selection]
	App --> Component
```

## Round Sequence

```mermaid
sequenceDiagram
	participant User
	participant Setup
	participant Hook as useGame
	participant Reducer as game.reducer
	participant App
	User->>Setup: Configure game
	Setup->>Hook: startGame()
	Hook->>Hook: validate, assign roles, select word
	Hook->>Reducer: START_GAME(payload)
	Reducer-->>App: phase = passing
	User->>Hook: passPlayer()
	Hook->>Reducer: PASS_PLAYER
	Reducer-->>App: next player or discussion
	User->>Hook: reveal()
	Hook->>Reducer: REVEAL
	Reducer-->>App: phase = reveal
```

## Settings Flow

```mermaid
flowchart LR
	Input[Settings input] --> Draft[useSettings draft]
	Draft -->|save| Schema[settingsSchema]
	Schema -->|valid| Committed[Committed settings]
	Schema -->|invalid| Draft
	Committed --> Theme[App theme]
	Committed --> Language[i18n language]
```

## Time-limit Flow

```mermaid
flowchart LR
	Minutes[Input minutes] --> Convert[useGame converts x60]
	Convert --> State[game.timeLimit seconds]
	State --> Timer[Timer countdown]
	Timer -->|zero| Reveal[REVEAL]
	Reveal --> Discussion[discussion -> reveal]
```

## State Ownership

| Data                   | Owner            | Notes                                          |
| ---------------------- | ---------------- | ---------------------------------------------- |
| Players and roles      | Game reducer     | Roles regenerate each round and clear on exit. |
| Current word           | Game reducer     | Generated outside reducer and cleared on exit. |
| Phase and player index | Game reducer     | Drive page selection and role passing.         |
| Setup configuration    | Game reducer     | Preserved across restart and exit.             |
| Committed settings     | Settings context | Includes theme and language.                   |
| Editable settings      | `useSettings`    | Committed after schema validation.             |
| Countdown              | `Timer`          | Transient seconds-based state.                 |
