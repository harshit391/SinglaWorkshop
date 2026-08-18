import { cacheLife, cacheTag } from 'next/cache';
import { connectDB } from '@/server/db';
import { Section } from '@/server/db/models';
import type { CreateSectionInput, UpdateSectionInput } from '@/server/validations/section';

export async function getSections() {
  'use cache';
  cacheLife('hours');
  cacheTag('sections');
  await connectDB();
  return Section.find({ isVisible: true }).sort({ order: 1 }).lean();
}

export async function getAllSections() {
  'use cache';
  cacheLife('hours');
  cacheTag('sections');
  await connectDB();
  return Section.find().sort({ order: 1 }).lean();
}

export async function getSectionBySlug(slug: string) {
  'use cache';
  cacheLife('hours');
  cacheTag('sections');
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
