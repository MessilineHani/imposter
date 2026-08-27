# Game Logic

## Round Lifecycle

```text
setup -> passing -> discussion -> reveal
						 |           |
						 +-----------+-- restart -> passing
									 +-- exit -> setup
```

Players, imposter count, categories, and time limit can change only during `setup`.

`useGame.startGame` validates setup, selects unique random imposter indexes, assigns roles, filters words by category, selects a random word, and dispatches `START_GAME`.

The reducer accepts `START_GAME` from `setup` or `reveal`, stores the prepared round, and resets `currentPlayerIndex` to `0`.

Each `PASS_PLAYER` advances the current player. Passing the final player changes the phase to `discussion`. Manual `REVEAL` or timer expiry changes `discussion` to `reveal`.

`restart` generates fresh roles and a word while preserving configuration. `EXIT_GAME` returns to setup, preserves configuration and names, and clears roles, word, and player index.

## Reducer Invariants

- 3 to 15 players.
- Non-empty normalized player names.
- Roles are `imposter` or `crew`.
- Imposter count matches the configured count.
- At least two crew members.
- Valid word field types and non-empty content.
- Setup-only configuration mutation.
- Valid phase transitions.

The reducer validates category format but does not inspect `words.json`. Semantic category membership remains in `useGame`.
