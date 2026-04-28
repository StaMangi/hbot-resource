// Cross-reference validator — fails the build if any [N] tag in a content
// entry's refs[] doesn't have a matching ref-N.yaml in the references
// collection. Phase 3.D's "no dead links" guarantee.
//
// Used inside getStaticPaths of each detail-page template:
//   for (const e of entries) await verifyRefs(e.data.refs, `indications/${e.id}`);

import { getCollection } from "astro:content";

let cache: Set<number> | null = null;

async function loadRefNumbers(): Promise<Set<number>> {
  if (cache) return cache;
  const refs = await getCollection("references");
  cache = new Set(refs.map((r) => r.data.num));
  return cache;
}

/**
 * @throws if any tag like "[N]" cannot be resolved to a `ref-N.yaml` in the
 *   references collection. The error message names the offending entry so
 *   the developer can fix the source YAML rather than hunting through build
 *   logs.
 */
export async function verifyRefs(refs: string[], context: string): Promise<void> {
  const numbers = await loadRefNumbers();
  for (const raw of refs) {
    const m = raw.match(/^\[(\d+)\]$/);
    if (!m) {
      throw new Error(
        `Invalid ref tag "${raw}" in ${context}: expected format "[N]" where N is a positive integer.`,
      );
    }
    const n = Number.parseInt(m[1], 10);
    if (!numbers.has(n)) {
      throw new Error(
        `Dead ref [${n}] in ${context}: no matching src/content/references/ref-${n}.yaml exists.`,
      );
    }
  }
}
