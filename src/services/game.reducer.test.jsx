import { describe, expect, it } from "vitest";
import reducer from "./game.reducer.jsx";

const createState = (overrides = {}) => ({
  players: [
    { name: "Alice", role: null },
    { name: "Bob", role: null },
    { name: "Cara", role: null },
  ],
  imposterCount: 1,
  phase: "setup",
  selectedCategories: ["all"],
  timeLimit: 60,
  currentWord: { word: null, hint: null, category: null },
  currentPlayerIndex: null,
  ...overrides,
});

const playersInRoles = [
  { name: " Alice  One ", role: "imposter" },
  { name: "Bob", role: "crew" },
  { name: "Cara", role: "crew" },
];

const word = { word: "Volcano", hint: "Nature", category: " Nature " };

const startAction = (overrides = {}) => ({
  type: "START_GAME",
  payload: { players: playersInRoles, word, ...overrides },
});

describe("game reducer", () => {
  it("normalizes names and word fields when starting a game", () => {
    const next = reducer(createState(), startAction());

    expect(next.phase).toBe("passing");
    expect(next.currentPlayerIndex).toBe(0);
    expect(next.players[0].name).toBe("Alice One");
    expect(next.currentWord).toEqual({
      word: "Volcano",
      hint: "Nature",
      category: "nature",
    });
  });

  it("rejects malformed start payloads", () => {
    const state = createState();

    expect(reducer(state, startAction({ word: { word: 1 } }))).toBe(state);
    expect(
      reducer(
        state,
        startAction({
          players: [
            { name: "Alice", role: "imposter" },
            { name: "Bob", role: "crew" },
            { name: "Cara", role: "imposter" },
          ],
        }),
      ),
    ).toBe(state);
  });

  it("normalizes valid category selections and rejects invalid formats", () => {
    const state = createState();
    const selected = reducer(state, {
      type: "SELECT_CATEGORY",
      payload: "  Nature  ",
    });

    expect(selected.selectedCategories).toEqual(["nature"]);
    expect(reducer(state, { type: "SELECT_CATEGORY", payload: "  " })).toBe(
      state,
    );
  });

  it("preserves the minimum player count and normalizes edited names", () => {
    const state = createState();

    expect(reducer(state, { type: "REMOVE_PLAYER", payload: 0 })).toBe(state);
    const edited = reducer(state, {
      type: "EDIT_PLAYER",
      payload: { index: 0, name: "  Alice   Smith  " },
    });
    expect(edited.players[0].name).toBe("Alice Smith");
  });

  it("passes the final player into discussion and reveals only from discussion", () => {
    const passing = createState({
      phase: "passing",
      players: playersInRoles,
      currentPlayerIndex: 2,
      currentWord: word,
    });

    expect(reducer(passing, { type: "PASS_PLAYER" }).phase).toBe("discussion");
    expect(reducer(passing, { type: "REVEAL" })).toBe(passing);
    expect(
      reducer({ ...passing, phase: "discussion" }, { type: "REVEAL" }).phase,
    ).toBe("reveal");
  });

  it("restarts from reveal and exits by clearing round data", () => {
    const reveal = createState({
      phase: "reveal",
      players: playersInRoles,
      currentWord: word,
      currentPlayerIndex: 2,
    });
    const restarted = reducer(reveal, startAction());

    expect(restarted.phase).toBe("passing");
    expect(restarted.currentPlayerIndex).toBe(0);

    const exited = reducer(reveal, { type: "EXIT_GAME" });
    expect(exited.phase).toBe("setup");
    expect(exited.players.every((player) => player.role === null)).toBe(true);
    expect(exited.currentWord).toEqual({
      word: null,
      hint: null,
      category: null,
    });
    expect(exited.imposterCount).toBe(reveal.imposterCount);
    expect(exited.selectedCategories).toBe(reveal.selectedCategories);
    expect(exited.timeLimit).toBe(reveal.timeLimit);
  });
});
