import React from 'react';
import type { FlexPattern } from '../types';

export const directionPatterns: FlexPattern[] = [
  {
    title: 'Default Row',
    description: 'Flex items lay out in a horizontal row by default, left to right.',
    properties: [
      {
        css: 'display: flex',
        tailwind: 'flex',
        explanation:
          'When you set display: flex, the default flex-direction is row. Items flow horizontally from left to right (in LTR languages). You don\'t need to explicitly set flex-direction: row — it\'s the default. The main axis is horizontal and the cross axis is vertical.',
      },
      {
        css: 'gap',
        tailwind: 'gap-4',
        explanation:
          'Sets a fixed gap between flex items without needing margin. gap: 1rem (gap-4 in Tailwind) adds space between items but not at the edges. You can also use gap-x and gap-y for independent horizontal and vertical gaps. Replaces the older technique of margin + negative margin on the container.',
      },
    ],
    code: `<div class="flex gap-4">
  <div class="bg-sky-200 p-3 rounded">One</div>
  <div class="bg-sky-300 p-3 rounded">Two</div>
  <div class="bg-sky-400 p-3 rounded">Three</div>
</div>`,
    demo: (
      <div className="flex gap-4">
        <div className="bg-sky-200 p-3 rounded">One</div>
        <div className="bg-sky-300 p-3 rounded">Two</div>
        <div className="bg-sky-400 p-3 rounded">Three</div>
      </div>
    ),
  },
  {
    title: 'Row Reverse',
    description: 'Reverse the visual order of items without changing the DOM order.',
    properties: [
      {
        css: 'flex-direction: row-reverse',
        tailwind: 'flex-row-reverse',
        explanation:
          'Reverses the main axis so items flow right to left. The DOM order stays the same, so screen readers and tab order are unchanged — this is purely visual. Useful for alternating layouts (e.g., image-text, text-image rows). Gotcha: justify-content values also flip — flex-start means the right side.',
      },
    ],
    code: `<div class="flex flex-row-reverse gap-4">
  <div class="bg-orange-200 p-3 rounded">First in DOM</div>
  <div class="bg-orange-300 p-3 rounded">Second</div>
  <div class="bg-orange-400 p-3 rounded">Third</div>
</div>`,
    demo: (
      <div className="flex flex-row-reverse gap-4">
        <div className="bg-orange-200 p-3 rounded text-sm">First in DOM</div>
        <div className="bg-orange-300 p-3 rounded text-sm">Second</div>
        <div className="bg-orange-400 p-3 rounded text-sm">Third</div>
      </div>
    ),
  },
  {
    title: 'Column',
    description: 'Stack items vertically from top to bottom.',
    properties: [
      {
        css: 'flex-direction: column',
        tailwind: 'flex-col',
        explanation:
          'Changes the main axis to vertical — items stack top to bottom. The cross axis becomes horizontal. This means justify-content now controls vertical spacing and align-items controls horizontal alignment. This is the basis for most vertical layouts: stacked forms, card content, sidebars, etc.',
      },
    ],
    code: `<div class="flex flex-col gap-3">
  <div class="bg-emerald-200 p-3 rounded">Top</div>
  <div class="bg-emerald-300 p-3 rounded">Middle</div>
  <div class="bg-emerald-400 p-3 rounded">Bottom</div>
</div>`,
    demo: (
      <div className="flex flex-col gap-3">
        <div className="bg-emerald-200 p-3 rounded">Top</div>
        <div className="bg-emerald-300 p-3 rounded">Middle</div>
        <div className="bg-emerald-400 p-3 rounded">Bottom</div>
      </div>
    ),
  },
  {
    title: 'Column Reverse',
    description: 'Stack items from bottom to top, reversing the visual order.',
    properties: [
      {
        css: 'flex-direction: column-reverse',
        tailwind: 'flex-col-reverse',
        explanation:
          'Items stack from bottom to top visually while maintaining DOM order. Commonly used for chat interfaces where new messages appear at the bottom but you want them visually at the bottom of the container. Like row-reverse, tab and screen reader order is unchanged.',
      },
    ],
    code: `<div class="flex flex-col-reverse gap-3">
  <div class="bg-rose-200 p-3 rounded">First in DOM</div>
  <div class="bg-rose-300 p-3 rounded">Second</div>
  <div class="bg-rose-400 p-3 rounded">Third</div>
</div>`,
    demo: (
      <div className="flex flex-col-reverse gap-3">
        <div className="bg-rose-200 p-3 rounded text-sm">First in DOM (appears last)</div>
        <div className="bg-rose-300 p-3 rounded text-sm">Second</div>
        <div className="bg-rose-400 p-3 rounded text-sm">Third (appears first)</div>
      </div>
    ),
  },
  {
    title: 'Custom Order',
    description: 'Reorder specific items visually without changing the HTML structure.',
    properties: [
      {
        css: 'order: -1 / 0 / 1',
        tailwind: 'order-first / order-none / order-last',
        explanation:
          'The order property controls the visual position of a flex item. Default is 0. Lower values appear first, higher values appear last. order-first sets order: -9999 and order-last sets order: 9999. You can also use order-1 through order-12 for fine control. Gotcha: only affects visual rendering — DOM order (and thus accessibility/tab order) is unchanged. Use sparingly and consider if reordering the HTML would be cleaner.',
      },
    ],
    code: `<div class="flex gap-4">
  <div class="order-last bg-violet-200 p-3">A (order-last)</div>
  <div class="bg-violet-300 p-3">B (default)</div>
  <div class="order-first bg-violet-400 p-3">C (order-first)</div>
</div>`,
    demo: (
      <div className="flex gap-4">
        <div className="order-last bg-violet-200 p-3 rounded text-sm">A (order-last)</div>
        <div className="bg-violet-300 p-3 rounded text-sm">B (default)</div>
        <div className="order-first bg-violet-400 p-3 rounded text-sm">C (order-first)</div>
      </div>
    ),
  },
];
