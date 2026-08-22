import z from "zod"

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
          name: z.string().min(1, 'Player name cannot be empty'),
        })
      )
      .min(3, 'Need at least 3 players')
      .max(15, 'Too many players'),

    imposterCount: z.number().min(1).max(5),
    selectedCategories: z
      .array(z.string())
      .min(1, 'Select at least one category'),

    timeLimit: z.number().min(0).max(1800), // Seconds; 0 => no limit 
  })
  .refine((data) => data.imposterCount <= data.players.length - 2, {
    message: 'Too many imposters for this player count — need at least 2 crew members',
    path: ['imposterCount'],
  });

// ---------------------------------------------------------------
// 2. Round state schema
// Validates the state your own START_GAME logic assembles, after
// roles are assigned and a word is picked. This is a sanity check
// on your own computed output, not user input — optional defense
// in depth, not the primary validation boundary.
// ---------------------------------------------------------------

const roundStateSchema = z
  .object({
    players: z
      .array(
        z.object({
          name: z.string().min(1),
          role: z.enum(['imposter', 'crew']), 
        })
      )
      .min(3),

    imposterCount: z.number().min(1).max(5),

    phase: z.enum(['setup', 'passing', 'discussion', 'results']),

    currentWord: z.object({
      word: z.string().min(1),
      hint: z.string(),
      category: z.string().min(1),
    }),

    currentPlayerIndex: z.number().min(0),

    timeLimit: z.number().min(0).max(1800),
  })
  .refine(
    (data) =>
      data.players.filter((p) => p.role === 'imposter').length === data.imposterCount,
    {
      message: 'Number of assigned imposters does not match imposterCount',
      path: ['players'],
    }
  )
  .refine((data) => data.currentPlayerIndex < data.players.length, {
    message: 'currentPlayerIndex out of bounds',
    path: ['currentPlayerIndex'],
  });  


export { setupInputSchema, roundStateSchema }