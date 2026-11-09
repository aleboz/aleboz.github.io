import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { VENUE_CATEGORIES, type VenueCategory } from '@/lib/venues';
import { cn } from '@/lib/utils';

export interface VenueOption {
  /** Filter key, e.g. "conference::ICWE". */
  key: string;
  category: VenueCategory;
  /** Group name, e.g. "CHI". */
  name: string;
  /** Full name, matched by the search box, e.g. "ACM CHI Conference on Human Factors in Computing Systems". */
  longName: string;
}

interface VenueFilterProps {
  options: VenueOption[];
  value: string;
  onChange: (value: string) => void;
  count: (key: string) => number;
}

/**
 * Plain substring search on the short and full names (cmdk's default is
 * fuzzy, so "CHI" would also match "Cities & Health"). Ranks: short name
 * starts with the query, short name contains it, full name contains it.
 */
function matchVenue(_value: string, search: string, keywords?: string[]): number {
  const q = search.trim().toLowerCase();
  if (!q) return 1;
  const [name = '', longName = ''] = (keywords ?? []).map(k => k.toLowerCase());
  if (name.startsWith(q)) return 1;
  if (name.includes(q)) return 0.8;
  return longName.includes(q) ? 0.5 : 0;
}

function triggerLabel(value: string, options: VenueOption[]): string {
  if (value === 'all') return 'All venues';
  const o = options.find(x => x.key === value);
  if (!o) return 'All venues';
  return o.category === 'edited' ? `${o.name} (edited)` : o.name;
}

/**
 * Searchable venue dropdown, styled like the other publication filters, with
 * options grouped into Journals, Conferences and Edited volumes. Each option
 * shows its result count; options with none are disabled unless selected.
 */
export default function VenueFilter({ options, value, onChange, count }: VenueFilterProps) {
  const [open, setOpen] = useState(false);
  const pick = (v: string) => { onChange(v); setOpen(false); };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-label="Filter by venue"
          className="flex h-10 w-40 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <span className="line-clamp-1 text-left">{triggerLabel(value, options)}</span>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" aria-hidden="true" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <Command filter={matchVenue}>
          <CommandInput placeholder="Search venues…" />
          <CommandList>
            <CommandEmpty>No venue found.</CommandEmpty>
            <CommandGroup>
              <CommandItem value="all" keywords={['All venues']} onSelect={() => pick('all')}>
                <Check className={cn('mr-2 h-4 w-4', value === 'all' ? 'opacity-100' : 'opacity-0')} aria-hidden="true" />
                All venues
              </CommandItem>
            </CommandGroup>
            {VENUE_CATEGORIES.map(cat => {
              const items = options.filter(o => o.category === cat.id);
              if (items.length === 0) return null;
              return (
                <CommandGroup key={cat.id} heading={cat.label}>
                  {items.map(o => {
                    const n = count(o.key);
                    return (
                      <CommandItem
                        key={o.key}
                        value={o.key}
                        keywords={[o.name, o.longName]}
                        disabled={n === 0 && value !== o.key}
                        onSelect={() => pick(o.key)}
                        title={o.longName}
                      >
                        <Check className={cn('mr-2 h-4 w-4 shrink-0', value === o.key ? 'opacity-100' : 'opacity-0')} aria-hidden="true" />
                        <span className="truncate">{o.name}</span>
                        <span className="ml-auto pl-4 text-xs tabular-nums text-muted-foreground">
                          <span aria-hidden="true">{n}</span>
                          <span className="sr-only">, {n} {n === 1 ? 'result' : 'results'}</span>
                        </span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              );
            })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
