import { z } from 'zod';

export const createSectionSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  description: z.string().default(''),
  icon: z.string().default('Folder'),
  color: z.string().default('hsl(36 100% 50%)'),
  order: z.coerce.number().int().default(0),
  isVisible: z.coerce.boolean().default(true),
});

export const updateSectionSchema = createSectionSchema.partial();

export type CreateSectionInput = z.infer<typeof createSectionSchema>;
export type UpdateSectionInput = z.infer<typeof updateSectionSchema>;
