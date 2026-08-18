'use server';

import { revalidatePath } from 'next/cache';
import { requireAuth } from '@/server/auth/helpers';
import { updateSiteSettings } from '@/server/data/settings';

export async function updateSettingsAction(formData: FormData) {
  await requireAuth();

  const data = {
    todaysNote: {
      text: formData.get('noteText') as string,
      author: formData.get('noteAuthor') as string,
    },
    currentWork: {
      title: formData.get('workTitle') as string,
      version: formData.get('workVersion') as string,
      href: formData.get('workHref') as string,
    },
  };

  await updateSiteSettings(data);
  revalidatePath('/');
  return { success: true };
}
