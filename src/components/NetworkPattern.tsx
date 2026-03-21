/**
 * A subtle network/graph SVG pattern representing Human-Centered AI.
 * Used as decorative background in the hero and section dividers.
 */
export function NetworkPattern({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Edges */}
      <g stroke="currentColor" strokeWidth="1" opacity="0.15">
        <line x1="120" y1="80" x2="280" y2="160" />
        <line x1="280" y1="160" x2="200" y2="300" />
        <line x1="120" y1="80" x2="200" y2="300" />
        <line x1="280" y1="160" x2="450" y2="120" />
        <line x1="450" y1="120" x2="600" y2="200" />
        <line x1="600" y1="200" x2="500" y2="350" />
        <line x1="500" y1="350" x2="280" y2="160" />
        <line x1="200" y1="300" x2="350" y2="420" />
        <line x1="350" y1="420" x2="500" y2="350" />
        <line x1="500" y1="350" x2="650" y2="450" />
        <line x1="350" y1="420" x2="200" y2="500" />
        <line x1="650" y1="450" x2="720" y2="320" />
        <line x1="720" y1="320" x2="600" y2="200" />
        <line x1="80" y1="400" x2="200" y2="300" />
        <line x1="80" y1="400" x2="200" y2="500" />
        <line x1="450" y1="120" x2="500" y2="350" />
        <line x1="700" y1="100" x2="600" y2="200" />
        <line x1="700" y1="100" x2="450" y2="120" />
      </g>
      {/* Nodes */}
      <g fill="currentColor" opacity="0.2">
        <circle cx="120" cy="80" r="4" />
        <circle cx="280" cy="160" r="6" />
        <circle cx="200" cy="300" r="5" />
        <circle cx="450" cy="120" r="5" />
        <circle cx="600" cy="200" r="6" />
        <circle cx="500" cy="350" r="7" />
        <circle cx="350" cy="420" r="5" />
        <circle cx="650" cy="450" r="4" />
        <circle cx="200" cy="500" r="4" />
        <circle cx="80" cy="400" r="3" />
        <circle cx="720" cy="320" r="4" />
        <circle cx="700" cy="100" r="3" />
      </g>
      {/* Highlighted central node — the "human" */}
      <circle cx="500" cy="350" r="12" fill="currentColor" opacity="0.08" />
    </svg>
  );
}

/**
 * Decorative section header with a short accent rule.
 */
export function SectionHeader({
  title,
  id,
  className = '',
}: {
  title: string;
  id: string;
  className?: string;
}) {
  return (
    <div className={`mb-10 text-center ${className}`}>
      <div className="mb-3 flex items-center justify-center gap-3" aria-hidden="true">
        <span className="h-px w-8 bg-warm" />
        <span className="h-1.5 w-1.5 rounded-full bg-warm" />
        <span className="h-px w-8 bg-warm" />
      </div>
      <h2 id={id} className="font-display text-2xl font-semibold md:text-3xl">
        {title}
      </h2>
    </div>
  );
}

/**
 * Thin decorative divider between sections.
 */
export function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-2" aria-hidden="true">
      <svg width="120" height="20" viewBox="0 0 120 20" className="text-muted-foreground/20">
        <line x1="0" y1="10" x2="45" y2="10" stroke="currentColor" strokeWidth="1" />
        <circle cx="52" cy="10" r="2" fill="currentColor" />
        <circle cx="60" cy="10" r="3" fill="hsl(var(--warm))" opacity="0.6" />
        <circle cx="68" cy="10" r="2" fill="currentColor" />
        <line x1="75" y1="10" x2="120" y2="10" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  );
}
