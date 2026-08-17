import { connectDB } from '@/server/db';
import { Section } from '@/server/db/models';
import type { CreateSectionInput, UpdateSectionInput } from '@/server/validations/section';

export async function getSections() {
  await connectDB();
  return Section.find({ isVisible: true }).sort({ order: 1 }).lean();
}

export async function getAllSections() {
  await connectDB();
  return Section.find().sort({ order: 1 }).lean();
}

export async function getSectionBySlug(slug: string) {
  await connectDB();
  return Section.findOne({ slug }).lean();
}

export async function getSectionById(id: string) {
  await connectDB();
  return Section.findById(id).lean();
}

export async function createSection(data: CreateSectionInput) {
  await connectDB();
  return Section.create(data);
}

export async function updateSection(id: string, data: UpdateSectionInput) {
  await connectDB();
  return Section.findByIdAndUpdate(id, data, { new: true }).lean();
}

export async function deleteSection(id: string) {
  await connectDB();
  return Section.findByIdAndDelete(id);
}
