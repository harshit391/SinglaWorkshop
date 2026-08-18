import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Singla Workshop — a curated collection of useful websites.',
};

export default function AboutPage() {
  return (
    <div className="px-4 py-8 md:px-8 lg:px-10">
      <h1 className="text-3xl font-semibold tracking-tight">About</h1>
      <p className="text-muted-foreground mt-4 max-w-lg text-sm leading-relaxed">
        Singla Workshop is a curated collection of websites and resources that I personally use and
        recommend. From movies and anime to games, software, and my own projects — these are the
        sites that have genuinely helped me.
      </p>
      <p className="text-muted-foreground mt-4 max-w-lg text-sm leading-relaxed">
        Maintained by Harshit Singla.
      </p>
    </div>
  );
}
