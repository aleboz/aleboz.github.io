import { Link } from 'react-router-dom';
import { ExternalLink, Mail, GraduationCap, BookOpen, Github, Linkedin } from 'lucide-react';

const quickLinks = [
  { label: 'Research', path: '/research' },
  { label: 'Publications', path: '/publications' },
  { label: 'Projects', path: '/projects' },
  { label: 'Teaching', path: '/teaching' },
  { label: 'Contact', path: '/contact' },
];

const socialLinks = [
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=402ZM7UAAAAJ&hl=it', icon: GraduationCap },
  { label: 'DBLP', href: 'https://dblp.org/pid/12/2920.html', icon: BookOpen },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alessandrobozzon/', icon: Linkedin },
  { label: 'GitHub', href: 'https://github.com/aleboz', icon: Github },
  { label: 'Email', href: 'mailto:a.bozzon@tudelft.nl', icon: Mail },
];

export default function Footer() {
  return (
    <footer className="border-t bg-primary text-primary-foreground" role="contentinfo">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand column */}
          <div>
            <div className="mb-3 flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-warm text-warm-foreground font-display text-sm font-bold">
                AB
              </span>
              <span className="font-display text-base font-semibold">Alessandro Bozzon</span>
            </div>
            <p className="text-sm leading-relaxed opacity-80">
              Professor of Human-Centered Artificial Intelligence
            </p>
            <p className="mt-1 text-sm opacity-70">
              Delft University of Technology
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider opacity-70">Quick Links</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-1.5 list-none p-0">
                {quickLinks.map(link => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm opacity-80 transition-opacity hover:opacity-100"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider opacity-70">Connect</h3>
            <ul className="space-y-1.5 list-none p-0">
              {socialLinks.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    className="inline-flex items-center gap-2 text-sm opacity-80 transition-opacity hover:opacity-100"
                  >
                    <link.icon className="h-4 w-4" aria-hidden="true" />
                    {link.label}
                    {!link.href.startsWith('mailto') && (
                      <>
                        <ExternalLink className="h-3 w-3 opacity-50" aria-hidden="true" />
                        <span className="sr-only"> (opens in new tab)</span>
                      </>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center gap-2 border-t border-primary-foreground/20 pt-6 text-xs opacity-60 sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Alessandro Bozzon. All rights reserved.</p>
          <p>Faculty of Industrial Design Engineering, TU Delft</p>
        </div>
      </div>
    </footer>
  );
}
