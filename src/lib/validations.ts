import { z } from "zod";

// ─── Colleges List Query ─────────────────────────────────────────────────────

export const CollegesQuerySchema = z.object({
  search: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  course: z.string().optional(),
  exam: z.string().optional(),
  type: z.enum(["GOVERNMENT", "PRIVATE", "DEEMED", "AUTONOMOUS"]).optional(),
  fees_min: z.coerce.number().nonnegative().optional(),
  fees_max: z.coerce.number().nonnegative().optional(),
  sort: z
    .enum(["nirf_rank", "rating", "fees_min", "placement_percentage", "name"])
    .optional()
    .default("nirf_rank"),
  order: z.enum(["asc", "desc"]).optional().default("asc"),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(50).optional().default(12),
});

export type CollegesQuery = z.infer<typeof CollegesQuerySchema>;

// ─── Compare ─────────────────────────────────────────────────────────────────

export const CompareBodySchema = z.object({
  ids: z
    .array(z.string().min(1))
    .min(2, "Select at least 2 colleges to compare")
    .max(3, "Cannot compare more than 3 colleges at once"),
});

export type CompareBody = z.infer<typeof CompareBodySchema>;

// ─── Predict ─────────────────────────────────────────────────────────────────

export const PredictBodySchema = z.object({
  exam: z.string().min(1, "Exam name is required"),
  rank: z.number().int().positive("Rank must be a positive integer"),
});

export type PredictBody = z.infer<typeof PredictBodySchema>;
