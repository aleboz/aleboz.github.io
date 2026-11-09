/**
 * Venue grouping for the venue filter on the Publications page.
 *
 * venueGroup() puts a publication's short venue name under its main
 * conference or journal. Workshops, companion volumes, extended abstracts
 * and posters count towards their parent venue, e.g. "AutomationXP@CHI",
 * "CHI EA" -> "CHI" and "ICWE Workshops" -> "ICWE".
 */

/** Short names that don't follow the "X@PARENT" or "PARENT suffix" patterns. */
const EXPLICIT: Record<string, string> = {
  'EMNLP-IJCNLP': 'EMNLP',
  'SeCO Book': 'SeCO',
  'SeCO Workshop': 'SeCO',
  'UrbanMM@MM': 'ACM MM',
  // CSCW papers are published in the journal's CSCW issues.
  'PACM HCI': 'CSCW',
  'ICDEW': 'ICDE',
};

/** Suffixes marking a sub-venue of the conference named before them. */
const SUFFIXES = [' Workshops', ' Workshop', ' Companion', ' EA', ' Posters & Demos', ' WiP & Demos'];

export function venueGroup(venueShort: string | undefined): string {
  const v = (venueShort ?? '').trim();
  if (!v) return '';
  if (EXPLICIT[v]) return EXPLICIT[v];
  const at = v.lastIndexOf('@');
  if (at !== -1) return venueGroup(v.slice(at + 1));
  for (const s of SUFFIXES) {
    if (v.endsWith(s)) return v.slice(0, -s.length);
  }
  return v;
}

/**
 * Venue groups that are not offered in the filter: preprint servers, data
 * repositories, standalone workshops, books, patents and magazines. Their
 * publications are still listed; they just can't be filtered by venue.
 */
export const HIDDEN_VENUES = new Set([
  'arXiv', 'SeCO', 'KDWeb', 'IIR', 'SEBD', 'CBMI', 'MediaEval',
  '4TU', 'US Patent', 'Handbook', 'Springer', 'ERCIM News',
]);

/** Conferences that publish their papers as journal articles; listed under Conferences. */
const CONFERENCES_IN_JOURNALS = new Set(['CSCW']);

export type VenueCategory = 'transactions' | 'journal' | 'conference' | 'edited';

/** Categories in the order they appear in the dropdown. */
export const VENUE_CATEGORIES: { id: VenueCategory; label: string }[] = [
  { id: 'transactions', label: 'Transactions' },
  { id: 'journal', label: 'Journals' },
  { id: 'conference', label: 'Conferences' },
  { id: 'edited', label: 'Edited volumes' },
];

/** Dropdown category for a publication type; null for types not filtered by venue. */
export function venueCategory(type: string): VenueCategory | null {
  if (type === 'transactions') return 'transactions';
  if (type === 'journal') return 'journal';
  if (type === 'conference' || type === 'workshop' || type === 'other') return 'conference';
  if (type === 'edited') return 'edited';
  return null;
}

/**
 * The venue-filter key for a publication ("conference::ICWE"), or '' when it
 * isn't filterable by venue. Keyed by category so that e.g. ICWE papers and
 * the ICWE proceedings you edited are separate options.
 */
export function venueKey(p: { type: string; venueShort?: string }): string {
  const group = venueGroup(p.venueShort);
  let category = venueCategory(p.type);
  if (!group || !category || HIDDEN_VENUES.has(group)) return '';
  // Conferences whose papers are published in a journal (CSCW in PACM HCI) stay one option.
  if (category === 'journal' && CONFERENCES_IN_JOURNALS.has(group)) category = 'conference';
  return `${category}::${group}`;
}
