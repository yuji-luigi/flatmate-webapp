export const CATEGORIES = {
  maintenances: 'Maintenance',
  threads: 'Post',
  other: 'Other',
} as const;
export type Category = (typeof CATEGORIES)[keyof typeof CATEGORIES];
