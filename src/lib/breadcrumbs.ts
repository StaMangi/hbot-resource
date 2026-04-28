// Shared type for breadcrumb trails. Used by Breadcrumbs.astro (visual),
// DetailLayout (the prop), BaseLayout (pass-through), and BaseHead (emits
// BreadcrumbList JSON-LD when populated). Single source of truth so the
// visual trail and the schema stay in sync.

export interface BreadcrumbItem {
  label: string;
  /** Omit on the current page (last item) — surfaces aria-current="page". */
  href?: string;
}
