import type { ReactNode } from 'react';

export type FlexProperty = {
  /** The CSS property name, e.g. "justify-content" */
  css: string;
  /** The Tailwind utility class, e.g. "justify-center" */
  tailwind: string;
  /** Detailed explanation: what it does, possible values, when to use, gotchas */
  explanation: string;
};

export type FlexPattern = {
  title: string;
  description: string;
  properties: FlexProperty[];
  code: string;
  demo: ReactNode;
};

export type FlexCategory = {
  id: string;
  title: string;
  patterns: FlexPattern[];
};
