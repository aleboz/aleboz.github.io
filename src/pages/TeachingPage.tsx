import { motion } from 'framer-motion';
import { ExternalLink, GraduationCap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import coursesData from '@/data/teaching.json';
import type { Course } from '@/types';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

export default function TeachingPage() {
  useDocumentTitle('Teaching');
  const rawCourses = coursesData as Course[] | { default: Course[] };
  const courses: Course[] = 'default' in rawCourses ? rawCourses.default : rawCourses;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-2 font-display text-3xl font-bold md:text-4xl">Teaching</h1>
      <p className="mb-10 text-muted-foreground">Courses and seminars.</p>

      <section aria-labelledby="courses-heading">
        <h2 id="courses-heading" className="mb-6 flex items-center gap-2 font-display text-2xl font-semibold">
          <GraduationCap className="h-6 w-6 text-primary" aria-hidden="true" /> Courses
        </h2>
        <motion.div initial="hidden" animate="show" variants={stagger} className="grid gap-4 md:grid-cols-2">
          {courses.map(course => (
            <motion.article key={course.id} variants={fadeUp} className="rounded-lg border bg-card p-5">
              <div className="mb-2 flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">{course.level}</Badge>
                <span className="text-xs text-muted-foreground">{course.years}</span>
              </div>
              <h3 className="mb-1 font-sans text-base font-semibold">{course.name}</h3>
              <p className="text-sm text-muted-foreground">{course.description}</p>
              {Object.entries(course.links).filter(([, v]) => v).map(([label, url]) => (
                <Button key={label} variant="ghost" size="sm" asChild className="mt-2">
                  <a href={url} target="_blank" rel="noopener noreferrer" className="text-xs capitalize">
                    {label} <ExternalLink className="ml-1 h-3 w-3" aria-hidden="true" />
                    <span className="sr-only">(opens in new tab)</span>
                  </a>
                </Button>
              ))}
            </motion.article>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
