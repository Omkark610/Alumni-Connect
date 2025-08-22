import { z } from "zod";

export const socialSchema = z.object({
  linkedin: z.string().url().optional().or(z.literal("")),
  instagram: z.string().url().optional().or(z.literal("")),
  linktree: z.string().url().optional().or(z.literal("")),
});

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  passoutYear: z.coerce.number().int().gte(1970).lte(new Date().getFullYear() + 1),
  password: z.string().min(6),
  socials: socialSchema.default({}),
});

export const updateSchema = z.object({
  name: z.string().min(2).optional(),
  passoutYear: z.coerce.number().int().gte(1970).lte(new Date().getFullYear() + 1).optional(),
  socials: socialSchema.optional(),
});