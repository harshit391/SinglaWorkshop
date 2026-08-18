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

  // Create categories
  const sections = await Section.insertMany([
    { name: 'Movies & Series', slug: 'movies-series', description: 'Best websites to download movies and TV series.', icon: 'Film', color: 'hsl(0 70% 55%)', order: 1, isVisible: true },
    { name: 'Anime', slug: 'anime', description: 'Websites for anime downloads and streaming.', icon: 'Zap', color: 'hsl(280 70% 60%)', order: 2, isVisible: true },
    { name: 'Books', slug: 'books', description: 'Websites for downloading books.', icon: 'BookOpen', color: 'hsl(36 90% 55%)', order: 3, isVisible: true },
    { name: 'Games', slug: 'games', description: 'PC game download sites I trust.', icon: 'Gamepad2', color: 'hsl(120 50% 50%)', order: 4, isVisible: true },
    { name: 'Software', slug: 'software', description: 'Websites for PC software downloads.', icon: 'Terminal', color: 'hsl(210 60% 55%)', order: 5, isVisible: true },
    { name: 'My Projects', slug: 'my-projects', description: 'Projects I built that genuinely helped me.', icon: 'Rocket', color: 'hsl(270 50% 60%)', order: 6, isVisible: true },
    { name: 'General', slug: 'general', description: 'General-purpose sites — last resort for everything.', icon: 'Globe', color: 'hsl(180 50% 50%)', order: 7, isVisible: true },
  ]);
  console.log(`Created ${sections.length} categories.`);

  const [moviesSeries, anime, books, games, software, myProjects, general] = sections;

  // Create items (websites)
  const items = await Item.insertMany([
    // Movies & Series
    {
      title: 'Vegamovies',
      slug: 'vegamovies',
      section: moviesSeries._id,
      description: 'Best website to download movies and series — Hollywood and foreign. My go-to for most movie downloads.',
      status: 'ACTIVE',
      url: 'https://new2.vegamovies.futbol',
      featured: true,
      pinned: true,
      urlUnstable: true,
    },
    {
      title: 'Rogmovies',
      slug: 'rogmovies',
      section: moviesSeries._id,
      description: 'Best website to download Indian movies. Much better than Movies Leech for Bollywood content.',
      status: 'ACTIVE',
      url: 'https://rogmovies.com',
      featured: false,
      urlUnstable: true,
    },
    {
      title: 'Moviesmod',
      slug: 'moviesmod',
      section: moviesSeries._id,
      description: 'Best website to download foreign movies but majorly for Korean dramas and C-dramas. Very good collection.',
      status: 'ACTIVE',
      url: 'https://moviesmod.day',
      featured: true,
      urlUnstable: true,
    },
    {
      title: 'UHD Movies',
      slug: 'uhd-movies',
      section: moviesSeries._id,
      description: 'Website to download movies and series in 4K quality. Not much recommended unless you specifically need 4K.',
      status: 'ACTIVE',
      url: 'https://uhdmovies.dad',
      featured: false,
      urlUnstable: true,
    },
    {
      title: 'Movies Leech',
      slug: 'movies-leech',
      section: moviesSeries._id,
      description: 'Website to download Indian movies. Not as good compared to Rogmovies but still works as backup.',
      status: 'ACTIVE',
      url: 'https://moviesleech.com',
      featured: false,
      urlUnstable: true,
    },
    // Anime
    {
      title: 'GokuHD',
      slug: 'gokuhd',
      section: anime._id,
      description: 'Website for anime downloads. Good collection and reliable links.',
      status: 'ACTIVE',
      url: 'https://gokuhd.com',
      featured: true,
      urlUnstable: true,
    },
    {
      title: 'Animeflix',
      slug: 'animeflix',
      section: anime._id,
      description: 'Website to download animes. Another solid option for anime content.',
      status: 'ACTIVE',
      url: 'https://animeflix.live',
      featured: false,
      urlUnstable: true,
    },
    // Books
    {
      title: 'Annas Archive',
      slug: 'annas-archive',
      section: books._id,
      description: 'Website to download books — normally all the books will be available here and no way there is any other site required.',
      status: 'ACTIVE',
      url: 'https://annas-archive.org',
      featured: true,
      pinned: true,
    },
    // Games
    {
      title: 'Fitgirl Repack',
      slug: 'fitgirl-repack',
      section: games._id,
      description: 'My favourite site to download games. If you don\'t find it here, better avoid downloading it or use Ocean of Games.',
      status: 'ACTIVE',
      url: 'https://fitgirl-repacks.site',
      featured: true,
      pinned: true,
    },
    {
      title: 'Steam Unlocked',
      slug: 'steam-unlocked',
      section: games._id,
      description: 'My second favourite site to download games. Download speed is slow intentionally by the site but quality is very very good.',
      status: 'ACTIVE',
      url: 'https://steamunlocked.net',
      featured: true,
    },
    {
      title: 'Ocean of Games',
      slug: 'ocean-of-games',
      section: games._id,
      description: 'Very OG site for games. Can be used to download most games. Been around for ages and still reliable.',
      status: 'ACTIVE',
      url: 'https://oceansofgames.com',
      featured: false,
    },
    {
      title: 'Games Leech',
      slug: 'games-leech',
      section: games._id,
      description: 'PC games downloads. Good alternative when other sites don\'t have what you need.',
      status: 'ACTIVE',
      url: 'https://gamesleech.com',
      featured: false,
    },
    // Software
    {
      title: 'Software Leech',
      slug: 'software-leech',
      section: software._id,
      description: 'For PC softwares. Reliable source for getting applications.',
      status: 'ACTIVE',
      url: 'https://softwareleech.com',
      featured: false,
    },
    {
      title: 'Get Into PC',
      slug: 'get-into-pc',
      section: software._id,
      description: 'Well-known site for downloading PC software. Has been around for a long time.',
      status: 'ACTIVE',
      url: 'https://getintopc.com',
      featured: true,
    },
    {
      title: 'All for World',
      slug: 'all-for-world',
      section: software._id,
      description: 'Another source for PC software downloads.',
      status: 'ACTIVE',
      url: 'https://allforworld.com',
      featured: false,
    },
    // My Projects
    {
      title: 'Task Spin',
      slug: 'task-spin',
      section: myProjects._id,
      description: 'My favourite project of all time. Helped me a lot to keep track of tasks. Very simple but it helped me decide tasks and think properly about what I actually have to do.',
      status: 'ACTIVE',
      url: 'https://taskspin.vercel.app',
      featured: true,
      pinned: true,
    },
    {
      title: 'Split Solve',
      slug: 'split-solve',
      section: myProjects._id,
      description: 'My very own Splitwise. Made to follow Go Dutch rule properly. Splits bills with custom syntax — even GSTs and discounts get split based on individual expense rather than group.',
      status: 'ACTIVE',
      url: 'https://splitsolve.vercel.app',
      featured: true,
    },
    {
      title: 'Future Ledger',
      slug: 'future-ledger',
      section: myProjects._id,
      description: 'Website to keep track of expenses smartly and plan for future savings. Helps kill emotional buying and decide if you even need to buy something.',
      status: 'ACTIVE',
      url: 'https://futureledger.vercel.app',
      featured: false,
    },
    {
      title: 'Lets Help',
      slug: 'lets-help',
      section: myProjects._id,
      description: 'My best creation of all time. Helped a lot of students by providing CSE resources all at one site.',
      status: 'ACTIVE',
      url: 'https://letshelp.vercel.app',
      featured: true,
    },
    {
      title: 'Railroad',
      slug: 'railroad',
      section: myProjects._id,
      description: 'Made for fun for the game Railroad Empire. Tracks items in warehouse so you get exact numbers of trains needed to not overfill the warehouse with resources.',
      status: 'ACTIVE',
      url: 'https://railroad-empire.vercel.app',
      featured: false,
    },
    // General
    {
      title: '1337x.to',
      slug: '1337x',
      section: general._id,
      description: 'My last resort for everything. Requires VPN to operate but will provide as much content as you need — movies, series, books, anything.',
      status: 'ACTIVE',
      url: 'https://1337x.to',
      featured: true,
      pinned: true,
      urlUnstable: true,
    },
  ]);
  console.log(`Created ${items.length} items.`);

  // Create site settings (minimal)
  await SiteSettings.create({
    todaysNote: { text: '', author: '' },
    currentWork: { title: '', version: '', href: '/' },
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
