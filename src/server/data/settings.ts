import { connectDB } from '@/server/db';
import { SiteSettings } from '@/server/db/models';
import type { UpdateSettingsInput } from '@/server/validations/settings';

export async function getSiteSettings() {
  await connectDB();
  let settings = await SiteSettings.findOne().lean();
  if (!settings) {
    settings = await SiteSettings.create({
      todaysNote: {
        text: "Discipline is building the system for days when motivation doesn't show up.",
        author: 'HS',
      },
      currentWork: { title: 'Singla Workshop', version: 'v1.0', href: '/' },
      aboutContent: '',
    });
    return settings.toObject();
  }
  return settings;
}

export async function updateSiteSettings(data: UpdateSettingsInput) {
  await connectDB();
  return SiteSettings.findOneAndUpdate({}, { $set: data }, { new: true, upsert: true }).lean();
}
