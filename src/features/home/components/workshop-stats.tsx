interface WorkshopStatsProps {
  stats: { label: string; count: number }[];
}

export function WorkshopStats({ stats }: WorkshopStatsProps) {
  return (
    <section className="border-border bg-card rounded-lg border p-5">
      <h3 className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
        Collection
      </h3>
      <dl className="mt-3 space-y-2">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center justify-between">
            <dt className="text-muted-foreground text-sm">{stat.label}</dt>
            <dd className="text-foreground font-mono text-sm font-medium">{stat.count}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
