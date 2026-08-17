import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  currentWork: { title: string; version: string; href: string };
}

export function HeroSection({ currentWork }: HeroSectionProps) {
  return (
    <section className="py-8 md:py-12">
      <p className="font-hand text-muted-foreground text-xl">Welcome to</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">Singla Workshop</h1>
      <p className="text-muted-foreground mt-3 max-w-md text-sm leading-relaxed">
        Things I&apos;m building, tracking, learning and figuring out along the way.
      </p>
      <div className="mt-6 flex items-center gap-2 text-sm">
        <span className="bg-primary inline-block h-2 w-2 animate-pulse rounded-full" />
        <span className="text-muted-foreground">Currently working on</span>
        <Link
          href={currentWork.href}
          className="text-primary hover:text-primary/80 inline-flex items-center gap-1 font-medium transition-colors"
        >
          {currentWork.title} {currentWork.version}
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </section>
  );
}
