export type RouteType = {
  href: string;
  label: string;
  active: boolean;
};

export const ComponentEnum = [
  'Badge',
  'Button',
  'Card',
  'Image',
  'Title',
  'TextBlock',
  'Link',
] as const;

export type ComponentType = (typeof ComponentEnum)[number];
