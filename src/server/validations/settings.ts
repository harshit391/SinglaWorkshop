import { z } from 'zod';

export const updateSettingsSchema = z.object({
  todaysNote: z
    .object({
      text: z.string(),
      author: z.string(),
    })
    .optional(),
  currentWork: z
    .object({
      title: z.string(),
      version: z.string(),
      href: z.string(),
    })
    .optional(),
  aboutContent: z.string().optional(),
});

export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
