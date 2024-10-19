export type RouteType = {
  href: string;
  label: string;
  active: boolean;
};

export const ComponentEnum = [
  'Button',
  'Card',
  'Image',
  'Text',
  'TextBlock',
] as const;

export type ComponentType = typeof ComponentEnum[number];
