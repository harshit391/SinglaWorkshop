// @ts-nocheck
import mongoose from 'mongoose';

const MONGODB_URI = process.env.DATABASE_URL ||
  'mongodb+srv://harshitsingla1761_db_user:OHykk1dC4mdvJCo8@cluster0.yesotah.mongodb.net/singlaworkshop?retryWrites=true&w=majority&appName=Cluster0';

const sectionSchema = new mongoose.Schema(
  {
    name: String,
    slug: { type: String, unique: true },
    description: String,
    icon: String,
    color: String,
    order: Number,
    isVisible: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const itemSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,
    section: { type: mongoose.Schema.Types.ObjectId, ref: 'Section' },
    description: String,
    content: String,
    tags: [String],
    status: String,
    url: String,
    imageUrl: String,
    featured: { type: Boolean, default: false },
    pinned: { type: Boolean, default: false },
    metadata: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true },
);

itemSchema.index({ section: 1, slug: 1 }, { unique: true });

const siteSettingsSchema = new mongoose.Schema(
  {
    todaysNote: { text: String, author: String },
    currentWork: { title: String, version: String, href: String },
    aboutContent: String,
  },
  { timestamps: true },
);

const Section = mongoose.models.Section || mongoose.model('Section', sectionSchema);
const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);
const SiteSettings = mongoose.models.SiteSettings || mongoose.model('SiteSettings', siteSettingsSchema);

async function seed() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected.');

  // Clear existing data
  await Section.deleteMany({});
  await Item.deleteMany({});
  await SiteSettings.deleteMany({});
  console.log('Cleared existing data.');

  // Create sections
  const sections = await Section.insertMany([
    { name: 'Projects', slug: 'projects', description: 'Things I build — software, tools, and personal systems.', icon: 'Hammer', color: 'hsl(270 50% 60%)', order: 1, isVisible: true },
    { name: 'Experiments', slug: 'experiments', description: 'Ideas I\'m testing — code, design, workflows.', icon: 'FlaskConical', color: 'hsl(36 90% 55%)', order: 2, isVisible: true },
    { name: 'Systems', slug: 'systems', description: 'Personal systems and tools I use daily.', icon: 'Cog', color: 'hsl(150 50% 50%)', order: 3, isVisible: true },
    { name: 'Diaries', slug: 'diaries', description: 'Logs, journals, and daily tracking.', icon: 'BookOpen', color: 'hsl(25 80% 55%)', order: 4, isVisible: true },
    { name: 'Resources', slug: 'resources', description: 'Documents, templates, and references.', icon: 'FolderOpen', color: 'hsl(210 60% 55%)', order: 5, isVisible: true },
    { name: 'Notes', slug: 'notes', description: 'Quick thoughts, ideas, and reminders.', icon: 'StickyNote', color: 'hsl(180 50% 50%)', order: 6, isVisible: true },
  ]);
  console.log(`Created ${sections.length} sections.`);

  // Create items
  const projectsSection = sections[0];
  const experimentsSection = sections[1];
  const systemsSection = sections[2];
  const diariesSection = sections[3];
  const resourcesSection = sections[4];

  const items = await Item.insertMany([
    {
      title: 'Singla Workshop',
      slug: 'singla-workshop',
      section: projectsSection._id,
      description: 'Personal digital workshop — this site. Built with Next.js, Tailwind, MongoDB.',
      content: 'A personal workshop for things I build, track, learn, and experiment with. Built with Next.js 16, Tailwind CSS v4, MongoDB, and deployed on Vercel.',
      tags: ['next.js', 'tailwind', 'mongodb'],
      status: 'IN_PROGRESS',
      featured: true,
      pinned: false,
      url: 'https://singlaworkshop.vercel.app',
    },
    {
      title: 'Gym Diary',
      slug: 'gym-diary',
      section: diariesSection._id,
      description: 'Workout tracking system for recording exercises, sets, reps and progress.',
      content: 'Daily workout log tracking exercises, sets, reps, and progressive overload.',
      tags: ['fitness', 'tracking'],
      status: 'ACTIVE',
      featured: true,
      pinned: false,
    },
    {
      title: 'Finance System',
      slug: 'finance-system',
      section: systemsSection._id,
      description: 'Personal financial tracking — income, expenses, budgets.',
      content: 'A spreadsheet-based system for tracking income, expenses, and budgets.',
      tags: ['finance', 'spreadsheet'],
      status: 'ACTIVE',
      featured: true,
      pinned: false,
    },
    {
      title: 'Docker Experiments',
      slug: 'docker-experiments',
      section: experimentsSection._id,
      description: 'Experimenting with containerization, CI/CD pipelines, and VPS deployments.',
      content: 'Notes and configs from experimenting with Docker, GitHub Actions, and self-hosted VPS deployments.',
      tags: ['docker', 'devops', 'ci-cd'],
      status: 'IN_PROGRESS',
      featured: true,
      pinned: false,
    },
    {
      title: 'SRS Template',
      slug: 'srs-template',
      section: resourcesSection._id,
      description: 'Software Requirements Specification template for personal projects.',
      tags: ['template', 'documentation'],
      status: 'COMPLETED',
      featured: false,
      pinned: false,
    },
  ]);
  console.log(`Created ${items.length} items.`);

  // Create site settings
  await SiteSettings.create({
    todaysNote: {
      text: "Discipline is building the system for days when motivation doesn't show up.",
      author: 'HS',
    },
    currentWork: {
      title: 'Singla Workshop',
      version: 'v1.0',
      href: '/projects/singla-workshop',
    },
    aboutContent: '',
  });
  console.log('Created site settings.');

  await mongoose.disconnect();
  console.log('Done! Seed complete.');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
