import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Singla Workshop and the person behind it.',
};

export default function AboutPage() {
  return (
    <div className="px-4 py-8 md:px-8 lg:px-10">
      <h1 className="text-3xl font-semibold tracking-tight">About</h1>
      <p className="text-muted-foreground mt-4 max-w-lg text-sm leading-relaxed">
        Singla Workshop is a personal digital space where I document things I build, track, learn,
        and experiment with. It&apos;s not a portfolio — it&apos;s a workshop.
      </p>
      <p className="text-muted-foreground mt-4 max-w-lg text-sm leading-relaxed">
        Built and maintained by Harshit Singla.
      </p>
    </div>
  );
}
