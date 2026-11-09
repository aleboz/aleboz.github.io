import { describe, it, expect } from 'vitest';
import { venueGroup } from './venues';
import publications from '@/data/publications.json';

describe('venueGroup', () => {
  it.each([
    ['CHI', 'CHI'],
    ['CHI EA', 'CHI'],
    ['AutomationXP@CHI', 'CHI'],
    ['EmpathiCH@CHI', 'CHI'],
    ['ICWE Workshops', 'ICWE'],
    ['IWWOST@ICWE', 'ICWE'],
    ['WWW Companion', 'WWW'],
    ['CrowdSearch@WWW', 'WWW'],
    ['SAD/CrowdBias@HCOMP', 'HCOMP'],
    ['HCOMP WiP & Demos', 'HCOMP'],
    ['ISWC Posters & Demos', 'ISWC'],
    ['CSCW Companion', 'CSCW'],
    ['EMNLP-IJCNLP', 'EMNLP'],
    ['LOUHI@EMNLP', 'EMNLP'],
    ['SeCO Workshop', 'SeCO'],
    ['UrbanMM@MM', 'ACM MM'],
    ['VLDB J.', 'VLDB J.'],
    ['PACM HCI', 'PACM HCI'],
  ])('%s -> %s', (short, group) => {
    expect(venueGroup(short)).toBe(group);
  });

  it('returns an empty string when there is no venue', () => {
    expect(venueGroup('')).toBe('');
    expect(venueGroup(undefined)).toBe('');
  });

  it('never leaves a workshop marker or companion suffix in a group name', () => {
    const groups = new Set((publications as { venueShort?: string }[]).map(p => venueGroup(p.venueShort)));
    for (const g of groups) {
      expect(g).not.toMatch(/@| Workshops?$| Companion$| EA$/);
    }
  });
});
