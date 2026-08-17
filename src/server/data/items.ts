import { connectDB } from '@/server/db';
import { Item, Section } from '@/server/db/models';
import type { CreateItemInput, UpdateItemInput } from '@/server/validations/item';

export async function getItemsBySection(sectionId: string) {
  await connectDB();
  return Item.find({ section: sectionId }).sort({ pinned: -1, updatedAt: -1 }).lean();
}

export async function getItemBySlug(sectionSlug: string, itemSlug: string) {
  await connectDB();
  const section = await Section.findOne({ slug: sectionSlug }).lean();
  if (!section) return null;
  return Item.findOne({ section: section._id, slug: itemSlug }).populate('section').lean();
}

export async function getFeaturedItems(limit = 4) {
  await connectDB();
  return Item.find({ featured: true }).populate('section').sort({ updatedAt: -1 }).limit(limit).lean();
}

export async function getRecentItems(limit = 5) {
  await connectDB();
  return Item.find().populate('section').sort({ updatedAt: -1 }).limit(limit).lean();
}

export async function getItemCounts() {
  await connectDB();
  const counts = await Item.aggregate([
    { $group: { _id: '$section', count: { $sum: 1 } } },
  ]);
  const sections = await Section.find({ isVisible: true }).lean();
  return sections.map((section) => {
    const match = counts.find((c) => c._id.toString() === section._id.toString());
    return { label: section.name, count: match?.count ?? 0, slug: section.slug };
  });
}

export async function getItemById(id: string) {
  await connectDB();
  return Item.findById(id).populate('section').lean();
}

export async function getAllItems() {
  await connectDB();
  return Item.find().populate('section').sort({ updatedAt: -1 }).lean();
}

export async function createItem(data: CreateItemInput) {
  await connectDB();
  return Item.create(data);
}

export async function updateItem(id: string, data: UpdateItemInput) {
  await connectDB();
  return Item.findByIdAndUpdate(id, data, { new: true }).lean();
}

export async function deleteItem(id: string) {
  await connectDB();
  return Item.findByIdAndDelete(id);
}
