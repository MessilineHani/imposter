import z from "zod";

// ---------------------------------------------------------------
// 1. Setup input schema
// Validates what the user configured on the setup screen, at the
// moment they click "Play". This is the real trust boundary — form
// input, not internally-computed state — so this is where Zod does
// its actual job: catch incomplete/invalid input before START_GAME
// ever runs its logic.
// ---------------------------------------------------------------

const setupInputSchema = z
  .object({
    players: z
      .array(
        z.object({
          name: z.string().min(1, "Player name cannot be empty"),
        }),
      )
      .min(3, "Need at least 3 players")
      .max(15, "Too many players"),

    imposterCount: z.number().min(1).max(3),
    selectedCategories: z
      .array(z.string().min(3))
      .min(1, "Select at least one category"),

    timeLimit: z.number().min(0).max(1800), // Seconds; 0 => no limit
  })
  .refine((data) => data.imposterCount <= data.players.length - 2, {
    message:
      "Too many imposters for this player count — need at least 2 crew members",
    path: ["imposterCount"],
  });

export { setupInputSchema };
