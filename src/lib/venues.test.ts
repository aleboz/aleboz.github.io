import { describe, it, expect } from 'vitest';
import { venueGroup, venueKey, venueCategory, HIDDEN_VENUES } from './venues';
import publications from '@/data/publications.json';

const pubs = publications as { type: string; venueShort?: string; title: string }[];

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
    ['PACM HCI', 'CSCW'],
    ['ICDEW', 'ICDE'],
    ['EMNLP-IJCNLP', 'EMNLP'],
    ['LOUHI@EMNLP', 'EMNLP'],
    ['SeCO Workshop', 'SeCO'],
    ['UrbanMM@MM', 'ACM MM'],
    ['VLDB J.', 'VLDB J.'],
  ])('%s -> %s', (short, group) => {
    expect(venueGroup(short)).toBe(group);
  });

  it('returns an empty string when there is no venue', () => {
    expect(venueGroup('')).toBe('');
    expect(venueGroup(undefined)).toBe('');
  });

  it('never leaves a workshop marker or companion suffix in a group name', () => {
    for (const g of new Set(pubs.map(p => venueGroup(p.venueShort)))) {
      expect(g).not.toMatch(/@| Workshops?$| Companion$| EA$/);
    }
  });
});

describe('venueKey', () => {
  it('splits papers and edited volumes of the same venue', () => {
    expect(venueKey({ type: 'conference', venueShort: 'ICWE' })).toBe('conference::ICWE');
    expect(venueKey({ type: 'edited', venueShort: 'ICWE' })).toBe('edited::ICWE');
    expect(venueKey({ type: 'journal', venueShort: 'PACM HCI' })).toBe('conference::CSCW');
    expect(venueKey({ type: 'conference', venueShort: 'CSCW Companion' })).toBe('conference::CSCW');
  });

  it('puts Transactions in their own category', () => {
    expect(venueKey({ type: 'transactions', venueShort: 'TKDE' })).toBe('transactions::TKDE');
    expect(venueKey({ type: 'journal', venueShort: 'IEEE Access' })).toBe('journal::IEEE Access');
  });

  it('leaves out hidden venues and types that are not venues', () => {
    expect(venueKey({ type: 'preprint', venueShort: 'arXiv' })).toBe('');
    expect(venueKey({ type: 'conference', venueShort: 'SeCO Workshop' })).toBe('');
    expect(venueKey({ type: 'edited', venueShort: 'KDWeb' })).toBe('');
    expect(venueKey({ type: 'dataset', venueShort: '4TU' })).toBe('');
    expect(venueKey({ type: 'patent', venueShort: 'US Patent' })).toBe('');
    expect(venueKey({ type: 'other', venueShort: '' })).toBe('');
  });

  it('gives every visible publication a category', () => {
    for (const p of pubs) {
      const g = venueGroup(p.venueShort);
      if (g && !HIDDEN_VENUES.has(g)) expect(venueCategory(p.type), p.title).not.toBeNull();
    }
  });
});

describe('publication data', () => {
  it('types every Transactions venue as transactions, and nothing else', () => {
    for (const p of publications as { type: string; venueLong?: string; title: string }[]) {
      const isTransactions = /\bTransactions\b/.test(p.venueLong ?? '');
      if (p.type === 'journal' || p.type === 'transactions') {
        expect(p.type === 'transactions', p.title).toBe(isTransactions);
      }
    }
  });
});
