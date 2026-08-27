# Imposter

Imposter is a local pass-and-play party game. Players configure a group, privately view their roles and the secret word, discuss, and reveal the round result.

## Features

- 3 to 15 players.
- Configurable imposter count with at least two crew members.
- Category-based random word selection.
- Private role passing before discussion.
- Optional discussion timer.
- Restart with the same setup configuration and fresh roles/word.
- Exit to setup while preserving the current configuration.
- Draft-based settings with schema validation.
- Theme and language settings through the settings controller.

## Tech Stack

- React 19
- Vite
- React Context and `useReducer`
- Zod for validation
- i18next and `react-i18next`
- Vitest for reducer tests

## Getting Started

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

Run the reducer tests with:

```bash
npm test
```

## Game Flow

```text
setup -> passing -> discussion -> reveal
												 |           |
												 +-----------+-- restart -> passing
																		 +-- exit -> setup
```

The game phase is the navigation model. `App.jsx` maps the current phase to the corresponding page instead of using a client-side router.

## Time-limit Contract

Users enter the limit in minutes. `useGame` converts that value to seconds before saving it to game state. The reducer and `Timer` work only with seconds. A value of `0` means no time limit.

## Architecture

- [`useGame`](src/hooks/useGame.jsx) handles game commands, setup validation, random role/word selection, and time conversion.
- [`game.reducer`](src/services/game.reducer.jsx) owns pure game-state transitions and invariants.
- [`useSettings`](src/hooks/useSettings.jsx) owns draft settings, commit validation, and i18n language changes.
- [`GameContext`](src/context/game.context.jsx) provides game state and dispatch.
- [`SettingsContext`](src/context/settings.context.jsx) provides committed settings.
- [`App`](src/App.jsx) selects the page from `game.phase` and reads the committed theme.

Detailed documentation:

- [Game controller](docs/controllers/game-controller.md)
- [Settings controller](docs/controllers/settings-controller.md)
- [Game logic](docs/game-logic.md)
- [Architecture](docs/architecture.md)
- [Data flow](docs/data-flow.md)

## Project Structure

```text
src/
	components/       Reusable game and setup components
	context/          Game and settings providers
	hooks/            Game, settings, and bottom-sheet controllers
	pages/            Phase-level page components
	services/         Pure game reducer and reducer tests
	utils/            Validation and localization setup
	assets/           Word data
docs/               Controller, logic, architecture, and data-flow docs
```

## Current Scope

The application is designed for local play in one browser session. Persistence, accounts, networking, and external game storage are intentionally out of scope. Sound/music behavior and broader UI/UX refinement can be developed independently from the game-state controller.
