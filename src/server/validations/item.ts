import { z } from 'zod';

export const createItemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  section: z.string().min(1, 'Section is required'),
  description: z.string().default(''),
  content: z.string().default(''),
  tags: z.array(z.string()).default([]),
  status: z.enum(['IDEA', 'IN_PROGRESS', 'ACTIVE', 'COMPLETED', 'ARCHIVED']).default('ACTIVE'),
  url: z.string().optional(),
  imageUrl: z.string().optional(),
  featured: z.coerce.boolean().default(false),
  pinned: z.coerce.boolean().default(false),
  metadata: z.record(z.string(), z.unknown()).default({}),
});

export const updateItemSchema = createItemSchema.partial();

export type CreateItemInput = z.infer<typeof createItemSchema>;
export type UpdateItemInput = z.infer<typeof updateItemSchema>;
