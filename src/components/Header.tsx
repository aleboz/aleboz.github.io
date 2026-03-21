import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';

/* Semantically grouped navigation */
const navGroups = [
  {
    items: [
      { label: 'Research', path: '/research' },
      { label: 'Publications', path: '/publications' },
      { label: 'Projects', path: '/projects' },
    ],
  },
  {
    items: [
      { label: 'Teaching', path: '/teaching' },
      { label: 'Supervision', path: '/supervision' },
      { label: 'Service', path: '/service' },
    ],
  },
  {
    items: [
      { label: 'News', path: '/news' },
      { label: 'Contact', path: '/contact' },
    ],
  },
];

const allNavItems = [
  { label: 'Home', path: '/' },
  ...navGroups.flatMap(g => g.items),
];

function NavLink({ path, label, active }: { path: string; label: string; active: boolean }) {
  return (
    <Link
      to={path}
      aria-current={active ? 'page' : undefined}
      className={`relative px-3 py-2 text-sm font-medium transition-colors hover:text-foreground ${
        active ? 'text-primary' : 'text-muted-foreground'
      }`}
    >
      {label}
      {/* Active underline indicator */}
      {active && (
        <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-warm" aria-hidden="true" />
      )}
    </Link>
  );
}

export default function Header() {
  const { theme, toggle } = useTheme();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Monogram logo */}
        <Link to="/" className="group flex items-center gap-2.5" aria-label="Home">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-display text-lg font-bold transition-colors group-hover:bg-warm">
            AB
          </span>
          <span className="hidden font-display text-base font-semibold tracking-tight text-foreground sm:inline">
            A. Bozzon
          </span>
        </Link>

        {/* Desktop nav — grouped with separators */}
        <nav className="hidden items-center lg:flex" aria-label="Main navigation">
          {navGroups.map((group, gi) => (
            <div key={gi} className="flex items-center">
              {gi > 0 && (
                <span className="mx-1 h-4 w-px bg-border" aria-hidden="true" />
              )}
              {group.items.map(item => (
                <NavLink
                  key={item.path}
                  path={item.path}
                  label={item.label}
                  active={location.pathname === item.path}
                />
              ))}
            </div>
          ))}
          <span className="mx-1 h-4 w-px bg-border" aria-hidden="true" />
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme" className="ml-1">
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </nav>

        {/* Mobile nav */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile navigation">
                {allNavItems.map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    aria-current={location.pathname === item.path ? 'page' : undefined}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted ${
                      location.pathname === item.path
                        ? 'text-primary border-l-2 border-warm bg-muted'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
