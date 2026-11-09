/**
 * Groups a publication's short venue name under its main conference or
 * journal, for the venue filter on the Publications page. Workshops,
 * companion volumes, extended abstracts and posters count towards their
 * parent venue, e.g. "AutomationXP@CHI", "CHI EA" -> "CHI" and
 * "ICWE Workshops" -> "ICWE".
 */

/** Short names that don't follow the "X@PARENT" or "PARENT suffix" patterns. */
const EXPLICIT: Record<string, string> = {
  'EMNLP-IJCNLP': 'EMNLP',
  'SeCO Book': 'SeCO',
  'SeCO Workshop': 'SeCO',
  'UrbanMM@MM': 'ACM MM',
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
