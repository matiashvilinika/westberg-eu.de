/**
 * ============================================================
 *  SECTION VISIBILITY SETTINGS  —  ON / OFF SWITCHES
 * ============================================================
 *
 *  Set a category to `false` to hide it everywhere:
 *    - the listing sections on the home page (DE + EN)
 *    - the /listings/<type>/<id> detail pages (they show "not found")
 *    - the admin panel sidebar, dashboard cards and quick actions
 *
 *  Set it back to `true` to bring it back. Nothing is deleted —
 *  the database rows and the admin pages stay untouched.
 *
 *  Note: the admin routes (e.g. /panel/dashboard/yachts) are only
 *  hidden from the menus. They remain reachable by typing the URL
 *  directly, so a disabled category can still be maintained.
 *
 *  A rebuild / redeploy is required for changes to take effect.
 */
export const sectionSettings = {
  cars: true,
  realEstate: true,
  yachts: false, // <-- OFF: yachts are hidden across the whole website
  motorcycles: true,
};

export type SectionKey = keyof typeof sectionSettings;

/** Maps the URL slug used in /listings/<slug>/... to a settings key. */
export const sectionKeyByUrlType: Record<string, SectionKey> = {
  cars: "cars",
  "real-estate": "realEstate",
  yachts: "yachts",
  motorcycles: "motorcycles",
};

/** True when the category (by settings key, e.g. "realEstate") is switched on. */
export function isSectionEnabled(key: string): boolean {
  return sectionSettings[key as SectionKey] ?? false;
}

/** True when the category (by URL slug, e.g. "real-estate") is switched on. */
export function isUrlTypeEnabled(urlType: string): boolean {
  const key = sectionKeyByUrlType[urlType];
  return key ? isSectionEnabled(key) : false;
}
