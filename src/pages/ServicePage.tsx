import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import serviceData from '@/data/service.json';
import type { ServiceData } from '@/types';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };

function ServiceSection({ id, title, items }: { id: string; title: string; items: { role: string; organization?: string; venue?: string; years?: string; year?: number }[] }) {
  return (
    <section className="mb-10" aria-labelledby={id}>
      <h2 id={id} className="mb-4 font-display text-xl font-semibold">{title}</h2>
      <motion.ul initial="hidden" animate="show" variants={stagger} className="space-y-2 list-none p-0">
        {items.map((item, i) => (
          <motion.li key={i} variants={fadeUp} className="flex flex-col gap-0.5 rounded-md border bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="font-sans text-sm font-semibold">{item.role}</span>
              <span className="text-sm text-muted-foreground"> — {item.organization || item.venue}</span>
            </div>
            <span className="text-xs text-muted-foreground shrink-0">{item.years || item.year}</span>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}

export default function ServicePage() {
  useDocumentTitle('Service & Leadership');
  const data = serviceData as ServiceData;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-2 font-display text-3xl font-bold md:text-4xl">Service & Leadership</h1>
      <p className="mb-10 text-muted-foreground">Academic leadership, editorial roles, and community service.</p>

      <ServiceSection id="leadership-heading" title="Academic Leadership" items={data.leadership} />
      <ServiceSection id="editorial-heading" title="Editorial Roles" items={data.editorial} />
      <ServiceSection id="committees-heading" title="Program Committees" items={data.programCommittees} />
      <ServiceSection id="initiatives-heading" title="Initiatives & Advisory" items={data.initiatives} />
    </div>
  );
}
