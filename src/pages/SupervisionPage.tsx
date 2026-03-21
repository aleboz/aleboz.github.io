import { motion } from 'framer-motion';
import { Users, FlaskConical } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import supervisionData from '@/data/supervision.json';
import type { Supervision } from '@/types';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

function SupervisionCard({ s }: { s: Supervision }) {
  return (
    <motion.div variants={fadeUp}
      className="flex flex-col gap-1 rounded-lg border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-muted-foreground">{s.years}</span>
        </div>
        {s.name && <p className="font-sans text-sm font-semibold">{s.name}</p>}
        <p className="text-sm text-muted-foreground">{s.topic}</p>
        {s.coSupervisors.length > 0 && (
          <p className="text-xs text-muted-foreground">Co-supervised with: {s.coSupervisors.join(', ')}</p>
        )}
      </div>
      {s.outcome && (
        <p className="text-xs text-primary font-medium shrink-0">{s.outcome}</p>
      )}
    </motion.div>
  );
}

export default function SupervisionPage() {
  useDocumentTitle('Supervision');
  const rawSupervision = supervisionData as Supervision[] | { default: Supervision[] };
  const supervision: Supervision[] = 'default' in rawSupervision ? rawSupervision.default : rawSupervision;

  const phdCandidates = supervision.filter(s => s.level === 'PhD');
  const postdocResearchers = supervision.filter(s => s.level === 'Postdoc');

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-2 font-display text-3xl font-bold md:text-4xl">Supervision</h1>
      <p className="mb-10 text-muted-foreground">PhD candidates and postdoc researchers.</p>

      {/* PhD Candidates */}
      <section className="mb-12" aria-labelledby="phd-heading">
        <h2 id="phd-heading" className="mb-6 flex items-center gap-2 font-display text-2xl font-semibold">
          <Users className="h-6 w-6 text-primary" aria-hidden="true" /> PhD Candidates
        </h2>
        <motion.div initial="hidden" animate="show" variants={stagger} className="space-y-3">
          {phdCandidates.map((s, i) => (
            <SupervisionCard key={i} s={s} />
          ))}
        </motion.div>
      </section>

      {/* Postdoc Researchers */}
      <section aria-labelledby="postdoc-heading">
        <h2 id="postdoc-heading" className="mb-6 flex items-center gap-2 font-display text-2xl font-semibold">
          <FlaskConical className="h-6 w-6 text-primary" aria-hidden="true" /> Postdoc Researchers
        </h2>
        <motion.div initial="hidden" animate="show" variants={stagger} className="space-y-3">
          {postdocResearchers.map((s, i) => (
            <SupervisionCard key={i} s={s} />
          ))}
        </motion.div>
      </section>
    </div>
  );
}
