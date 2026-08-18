'use server';

import { revalidatePath } from 'next/cache';
import { requireAuth } from '@/server/auth/helpers';
import { createSection, updateSection, deleteSection } from '@/server/data/sections';
import { createSectionSchema, updateSectionSchema } from '@/server/validations/section';

export async function createSectionAction(formData: FormData) {
  await requireAuth();

  const raw = {
    name: formData.get('name') as string,
    slug: formData.get('slug') as string,
    description: formData.get('description') as string,
    icon: formData.get('icon') as string,
    color: formData.get('color') as string,
    order: formData.get('order') as string,
    isVisible: formData.get('isVisible') === 'true',
  };

  const parsed = createSectionSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Validation failed' };
  }

  await createSection(parsed.data);
  revalidatePath('/', 'layout');
  return { success: true };
}

export async function updateSectionAction(id: string, formData: FormData) {
  await requireAuth();

  const raw = {
    name: formData.get('name') as string,
    slug: formData.get('slug') as string,
    description: formData.get('description') as string,
    icon: formData.get('icon') as string,
    color: formData.get('color') as string,
    order: formData.get('order') as string,
    isVisible: formData.get('isVisible') === 'true',
  };

  const parsed = updateSectionSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Validation failed' };
  }

  await updateSection(id, parsed.data);
  revalidatePath('/', 'layout');
  return { success: true };
}

export async function deleteSectionAction(id: string) {
  await requireAuth();
  await deleteSection(id);
  revalidatePath('/', 'layout');
  return { success: true };
}
