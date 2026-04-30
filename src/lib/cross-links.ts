// Build-time reverse index for cross-links across content collections.
// Computed once per build (memoised in module scope) — every detail page
// imports from the resolved index instead of recomputing.
//
// Powers two patterns:
//   1. Detail-page aside: "Related" entries that cite at least one of the
//      same references as the current entry. Sorted by overlap count.
//   2. /references/ page: "Cited in:" list per reference, showing which
//      mechanisms / indications / departments / longevity entries cite it.

import { getCollection } from "astro:content";

export type CrossRefCollection =
  | "mechanisms"
  | "indications"
  | "departments"
  | "longevity";

export interface CrossRef {
  collection: CrossRefCollection;
  slug: string;
  title: { en: string; el: string; de: string };
}

export interface CrossLinkIndex {
  /** ref num (string) → entries citing it */
  byReference: Map<string, CrossRef[]>;
  /** "<collection>/<slug>" → ordered list of related entries (≥1 shared ref, top 5) */
  relatedFor: Map<string, CrossRef[]>;
}

let cache: CrossLinkIndex | null = null;

const refKey = (raw: string): string | null => {
  const m = raw.match(/^\[(\d+)\]$/);
  return m ? m[1] : null;
};

const entryKey = (collection: CrossRefCollection, slug: string): string =>
  `${collection}/${slug}`;

export async function buildCrossLinkIndex(): Promise<CrossLinkIndex> {
  if (cache) return cache;

  const mechanisms = await getCollection("mechanisms");
  const indications = await getCollection("indications");
  const departments = await getCollection("departments");
  const longevity = await getCollection("longevity");

  // Forward index: every entry → set of ref nums it cites.
  const refsForEntry = new Map<string, Set<string>>();
  // Reverse index: every ref num → list of entries citing it.
  const byReference = new Map<string, CrossRef[]>();

  const addEntryRef = (
    collection: CrossRefCollection,
    slug: string,
    title: { en: string; el: string; de: string },
    refTags: string[],
  ) => {
    const key = entryKey(collection, slug);
    const set = refsForEntry.get(key) ?? new Set<string>();
    refsForEntry.set(key, set);

    for (const tag of refTags) {
      const num = refKey(tag);
      if (!num) continue;
      set.add(num);
      const list = byReference.get(num) ?? [];
      // Avoid duplicates if the same entry's refs[] lists [N] twice or
      // dept applications list overlapping refs.
      if (!list.some((r) => r.collection === collection && r.slug === slug)) {
        list.push({ collection, slug, title });
      }
      byReference.set(num, list);
    }
  };

  for (const e of mechanisms) {
    addEntryRef("mechanisms", e.id, e.data.title, e.data.refs);
  }
  for (const e of indications) {
    addEntryRef("indications", e.id, e.data.condition, e.data.refs);
  }
  for (const e of longevity) {
    addEntryRef("longevity", e.id, e.data.title, e.data.refs ?? []);
  }
  for (const e of departments) {
    // Departments aggregate refs from their applications.
    const allRefs: string[] = [];
    for (const app of e.data.applications) {
      for (const r of app.refs) allRefs.push(r);
    }
    addEntryRef("departments", e.id, e.data.name, allRefs);
  }

  // Build relatedFor: for each entry, find OTHER entries sharing ≥1 ref.
  // Score = number of shared refs. Sorted descending, capped at 5.
  const relatedFor = new Map<string, CrossRef[]>();

  for (const [key, refs] of refsForEntry.entries()) {
    if (refs.size === 0) {
      relatedFor.set(key, []);
      continue;
    }

    const overlaps = new Map<string, { count: number; entry: CrossRef }>();
    for (const ref of refs) {
      const citers = byReference.get(ref) ?? [];
      for (const c of citers) {
        const otherKey = entryKey(c.collection, c.slug);
        if (otherKey === key) continue;
        const existing = overlaps.get(otherKey);
        if (existing) {
          existing.count++;
        } else {
          overlaps.set(otherKey, { count: 1, entry: c });
        }
      }
    }

    const sorted = Array.from(overlaps.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map((o) => o.entry);

    relatedFor.set(key, sorted);
  }

  cache = { byReference, relatedFor };
  return cache;
}

export function relatedKey(collection: CrossRefCollection, slug: string): string {
  return entryKey(collection, slug);
}
