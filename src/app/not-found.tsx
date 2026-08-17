import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-primary font-mono text-5xl font-bold">404</p>
      <h1 className="mt-4 text-2xl font-semibold">Page not found</h1>
      <p className="text-muted-foreground mt-2 text-sm">
        This part of the workshop doesn&apos;t exist yet.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">Back to Workbench</Link>
      </Button>
    </div>
  );
}
