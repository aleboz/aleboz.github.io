import { motion } from 'framer-motion';
import bioPhoto from '@/assets/bio-photo-2024.jpeg';
import { Link } from 'react-router-dom';
import {
  ArrowRight, BookOpen, ExternalLink, GraduationCap,
  Award, Building2, Brain, Library, Trophy, Globe, Sparkles,
  Calendar, Mic, Newspaper, Gift, FileText, GraduationCap as GradCap, CalendarDays
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { NetworkPattern, SectionHeader, SectionDivider } from '@/components/NetworkPattern';
import profileData from '@/data/profile.json';
import newsData from '@/data/news.json';
import type { Profile, NewsItem } from '@/types';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const iconMap: Record<string, React.ReactNode> = {
  award: <Award className="h-5 w-5" aria-hidden="true" />,
  building: <Building2 className="h-5 w-5" aria-hidden="true" />,
  brain: <Brain className="h-5 w-5" aria-hidden="true" />,
  library: <Library className="h-5 w-5" aria-hidden="true" />,
  trophy: <Trophy className="h-5 w-5" aria-hidden="true" />,
  globe: <Globe className="h-5 w-5" aria-hidden="true" />,
};

const newsIconMap: Record<string, React.ReactNode> = {
  award: <Award className="h-3 w-3" aria-hidden="true" />,
  keynote: <Mic className="h-3 w-3" aria-hidden="true" />,
  media: <Newspaper className="h-3 w-3" aria-hidden="true" />,
  grant: <Gift className="h-3 w-3" aria-hidden="true" />,
  paper: <FileText className="h-3 w-3" aria-hidden="true" />,
  graduation: <GradCap className="h-3 w-3" aria-hidden="true" />,
  event: <CalendarDays className="h-3 w-3" aria-hidden="true" />,
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HomePage() {
  useDocumentTitle();
  const rawProfile = profileData as Profile | { default: Profile };
  const profile: Profile = 'default' in rawProfile ? rawProfile.default : rawProfile;
  const rawNews = newsData as NewsItem[] | { default: NewsItem[] };
  const news: NewsItem[] = 'default' in rawNews ? rawNews.default : rawNews;

  const recentNews = news
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  return (
    <>
      {/* Hero — split layout */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/8" aria-labelledby="hero-heading">
        {/* Network pattern background */}
        <NetworkPattern className="pointer-events-none absolute inset-0 h-full w-full text-primary" />

        <div className="container relative mx-auto px-4 py-20 md:py-28">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="flex flex-col items-center gap-12 md:flex-row md:gap-16"
          >
            {/* Photo side */}
            <motion.div variants={fadeUp} className="relative shrink-0">
              <div className="relative">
                {/* Accent panel behind photo */}
                <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20" aria-hidden="true" />
                <div className="absolute -bottom-2 -right-2 h-full w-full rounded-2xl border-2 border-warm/30" aria-hidden="true" />
                <img
                  src={bioPhoto}
                  alt="Portrait of Alessandro Bozzon"
                  className="relative w-52 rounded-2xl object-cover shadow-lg md:w-64"
                />
              </div>
            </motion.div>

            {/* Text side */}
            <div className="flex-1 text-center md:text-left">
              <motion.div variants={fadeUp} className="mb-3">
                <Badge className="bg-warm text-warm-foreground hover:bg-warm/90 text-xs font-medium">
                  {profile.affiliation}
                </Badge>
              </motion.div>
              <motion.h1 id="hero-heading" variants={fadeUp} className="mb-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                {profile.name}
              </motion.h1>
              <motion.p variants={fadeUp} className="mb-2 text-lg font-medium text-primary md:text-xl">
                {profile.titles[0]}
              </motion.p>
              <motion.p variants={fadeUp} className="mb-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {profile.researchStatement}
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <Button asChild>
                  <Link to="/publications"><BookOpen className="mr-2 h-4 w-4" aria-hidden="true" />Publications</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/projects">Projects</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/contact">Contact</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a href={profile.links.scholar} target="_blank" rel="noopener noreferrer">
                    <GraduationCap className="mr-1 h-4 w-4" aria-hidden="true" />Scholar
                    <ExternalLink className="ml-1 h-3 w-3" aria-hidden="true" />
                    <span className="sr-only">(opens in new tab)</span>
                  </a>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a href={profile.links.dblp} target="_blank" rel="noopener noreferrer">
                    DBLP
                    <ExternalLink className="ml-1 h-3 w-3" aria-hidden="true" />
                    <span className="sr-only">(opens in new tab)</span>
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
      <section className="container mx-auto px-4 py-16" aria-labelledby="highlights-heading">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <SectionHeader title="Highlights" id="highlights-heading" />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 list-none p-0">
            {profile.highlights.map((h, i) => (
              <motion.li
                key={i}
                variants={fadeUp}
                className="group rounded-lg border-l-4 border-l-warm border border-l-warm bg-card p-5 transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="rounded-md bg-primary/10 p-2 text-primary transition-colors group-hover:bg-warm/15 group-hover:text-warm" aria-hidden="true">
                    {iconMap[h.icon] || <Sparkles className="h-5 w-5" />}
                  </div>
                  <span className="text-xs font-semibold text-warm">{h.year}</span>
                </div>
                <h3 className="mb-1 font-sans text-sm font-semibold text-foreground">
                  {h.link ? (
                    <a href={h.link} target="_blank" rel="noopener noreferrer" className="underline decoration-warm/30 underline-offset-2 hover:decoration-warm transition-colors">
                      {h.title}
                      <span className="sr-only"> (opens in new tab)</span>
                    </a>
                  ) : h.title}
                </h3>
                <p className="text-sm text-muted-foreground">{h.description}</p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </section>

      <SectionDivider />

      {/* Recent News — timeline style */}
      <section className="bg-muted/40 py-20" aria-labelledby="news-heading">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <SectionHeader title="Recent News" id="news-heading" />
            <div className="mx-auto max-w-3xl">
              <div className="relative border-l-2 border-border pl-8 space-y-6">
                {recentNews.map((item) => (
                  <motion.article key={item.id} variants={fadeUp} className="relative">
                    {/* Timeline dot */}
                    <div className="absolute -left-[calc(0.625rem+1px)] top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-warm bg-background text-warm" aria-hidden="true">
                      {newsIconMap[item.type] || <Calendar className="h-3 w-3" />}
                    </div>
                    <div className="rounded-lg border bg-card p-4 transition-all hover:shadow-sm hover:border-warm/30">
                      <div className="mb-1 flex items-center gap-2">
                        <Badge className="bg-warm/10 text-warm hover:bg-warm/20 border-0 text-xs capitalize">{item.type}</Badge>
                        <time className="text-xs text-muted-foreground" dateTime={item.date}>
                          {new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </time>
                      </div>
                      <h3 className={`mb-1 font-sans text-sm font-semibold text-foreground${item.type === 'award' ? ' underline decoration-orange-500 decoration-2 underline-offset-2' : ''}`}>{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                        {item.link && (
                          <> {' '}
                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary hover:underline">
                              more… <ExternalLink className="ml-0.5 inline h-3 w-3" aria-hidden="true" />
                              <span className="sr-only"> about {item.title} (opens in new tab)</span>
                            </a>
                          </>
                        )}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
            <motion.div variants={fadeUp} className="mt-10 text-center">
              <Button variant="outline" asChild>
                <Link to="/news">All News & Talks <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* Bio */}
      <section className="py-20" aria-labelledby="bio-heading">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <SectionHeader title="About" id="bio-heading" />
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="shrink-0 md:hidden">
                <img
                  src={bioPhoto}
                  alt="Portrait of Alessandro Bozzon"
                  className="mx-auto w-48 rounded-lg object-cover shadow-md"
                  loading="lazy"
                />
              </div>
              <div>
                {profile.bioLong.split('\n\n').map((para, i) => (
                  <p key={i} className="mb-4 text-base leading-relaxed text-muted-foreground">{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
