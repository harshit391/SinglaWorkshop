import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const sectionSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    icon: { type: String, default: 'Folder' },
    color: { type: String, default: 'hsl(36 100% 50%)' },
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const ItemStatus = ['IDEA', 'IN_PROGRESS', 'ACTIVE', 'COMPLETED', 'ARCHIVED'] as const;

const itemSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    section: { type: Schema.Types.ObjectId, ref: 'Section', required: true },
    description: { type: String, default: '' },
    content: { type: String, default: '' },
    tags: { type: [String], default: [] },
    status: { type: String, enum: ItemStatus, default: 'ACTIVE' },
    url: String,
    imageUrl: String,
    featured: { type: Boolean, default: false },
    pinned: { type: Boolean, default: false },
    urlUnstable: { type: Boolean, default: false },
    metadata: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true },
);

itemSchema.index({ section: 1, slug: 1 }, { unique: true });

const siteSettingsSchema = new Schema(
  {
    todaysNote: {
      text: { type: String, default: '' },
      author: { type: String, default: '' },
    },
    currentWork: {
      title: { type: String, default: '' },
      version: { type: String, default: '' },
      href: { type: String, default: '/' },
    },
    aboutContent: { type: String, default: '' },
  },
  { timestamps: true },
);

export type SectionDoc = InferSchemaType<typeof sectionSchema>;
export type ItemDoc = InferSchemaType<typeof itemSchema>;
export type SiteSettingsDoc = InferSchemaType<typeof siteSettingsSchema>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Section: mongoose.Model<any> =
  mongoose.models.Section ?? mongoose.model('Section', sectionSchema);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Item: mongoose.Model<any> =
  mongoose.models.Item ?? mongoose.model('Item', itemSchema);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SiteSettings: mongoose.Model<any> =
  mongoose.models.SiteSettings ?? mongoose.model('SiteSettings', siteSettingsSchema);

export { ItemStatus };
