interface TodaysNoteProps {
  note: { text: string; author: string };
}

export function TodaysNote({ note }: TodaysNoteProps) {
  if (!note.text) return null;

  return (
    <section className="border-border bg-card rounded-lg border p-5">
      <h3 className="font-hand text-primary text-lg">Today&apos;s Note</h3>
      <blockquote className="text-foreground/90 mt-3 text-sm leading-relaxed">
        &ldquo;{note.text}&rdquo;
      </blockquote>
      <p className="font-hand text-muted-foreground mt-2 text-sm">— {note.author}</p>
    </section>
  );
}
