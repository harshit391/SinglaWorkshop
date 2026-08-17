import { getIcon } from '@/shared/lib/icons';

interface SectionHeaderProps {
  name: string;
  description: string;
  icon: string;
}

export function SectionHeader({ name, description, icon }: SectionHeaderProps) {
  const Icon = getIcon(icon);

  return (
    <header>
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg">
          <Icon className="h-5 w-5" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">{name}</h1>
      </div>
      {description && (
        <p className="text-muted-foreground mt-3 max-w-lg text-sm">{description}</p>
      )}
    </header>
  );
}
