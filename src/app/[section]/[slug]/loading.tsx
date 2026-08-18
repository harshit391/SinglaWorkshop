export default function Loading() {
  return (
    <div className="px-4 py-8 md:px-8 lg:px-10">
      <div className="space-y-4">
        <div className="bg-muted h-8 w-64 animate-pulse rounded" />
        <div className="bg-muted h-4 w-96 animate-pulse rounded" />
        <div className="bg-muted mt-6 h-48 animate-pulse rounded-lg" />
      </div>
    </div>
  );
}
