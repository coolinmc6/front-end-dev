import React from 'react';
import type { FlexPattern } from '../types';

export const sizingPatterns: FlexPattern[] = [
  {
    title: 'Equal-Width Columns',
    description: 'Make all children take up equal amounts of space, regardless of content.',
    properties: [
      {
        css: 'flex: 1 1 0%',
        tailwind: 'flex-1',
        explanation:
          'flex-1 is shorthand for flex-grow: 1, flex-shrink: 1, flex-basis: 0%. The key is flex-basis: 0% — it ignores the item\'s natural content width and distributes all space equally based on flex-grow. Compare with flex-auto (flex: 1 1 auto) which distributes only the remaining space after each item takes its natural size. Use flex-1 when you want truly equal columns.',
      },
    ],
    code: `<div class="flex gap-4">
  <div class="flex-1 bg-blue-200 p-4 rounded">Short</div>
  <div class="flex-1 bg-blue-300 p-4 rounded">
    Medium length content
  </div>
  <div class="flex-1 bg-blue-400 p-4 rounded">Short</div>
</div>`,
    demo: (
      <div className="flex gap-4">
        <div className="flex-1 bg-blue-200 p-4 rounded text-sm">Short</div>
        <div className="flex-1 bg-blue-300 p-4 rounded text-sm">Medium length content</div>
        <div className="flex-1 bg-blue-400 p-4 rounded text-sm">Short</div>
      </div>
    ),
  },
  {
    title: 'Fixed + Flexible',
    description: 'A fixed-width element next to one that fills the remaining space.',
    properties: [
      {
        css: 'flex-shrink: 0',
        tailwind: 'shrink-0',
        explanation:
          'Prevents the item from shrinking below its specified width. By default, flex items have flex-shrink: 1, meaning they can shrink if the container is too small. shrink-0 says "never shrink me" — essential for fixed-width sidebars, avatars, icons, etc. that should maintain their size.',
      },
      {
        css: 'flex: 1 1 0%',
        tailwind: 'flex-1',
        explanation:
          'The flexible item grows to fill all remaining space after the fixed-width item takes its share. This is the fundamental pattern for any layout with a fixed element and a fluid element: sidebars, icon + text rows, image + content cards.',
      },
    ],
    code: `<div class="flex gap-4">
  <div class="shrink-0 w-32 bg-red-200 p-3 rounded">
    Fixed 128px
  </div>
  <div class="flex-1 bg-red-100 p-3 rounded">
    Fills remaining space
  </div>
</div>`,
    demo: (
      <div className="flex gap-4">
        <div className="shrink-0 w-32 bg-red-200 p-3 rounded text-sm">Fixed 128px</div>
        <div className="flex-1 bg-red-100 p-3 rounded text-sm">Fills remaining space</div>
      </div>
    ),
  },
  {
    title: 'Equal-Height Columns',
    description: 'Columns automatically stretch to match the tallest sibling.',
    properties: [
      {
        css: 'align-items: stretch',
        tailwind: '(default)',
        explanation:
          'The default value of align-items is stretch — flex items expand to fill the container\'s cross-axis size. In a row layout, this means all items are the same height as the tallest item. You don\'t need to set this explicitly; it\'s the default behavior. If you set a fixed height on a child, it won\'t stretch. To see this in action, note how the short column matches the tall column\'s height.',
      },
    ],
    code: `<div class="flex gap-4">
  <div class="flex-1 bg-green-100 p-4 rounded">
    Short
  </div>
  <div class="flex-1 bg-green-200 p-4 rounded">
    Tall content<br/>Line 2<br/>Line 3<br/>Line 4
  </div>
  <div class="flex-1 bg-green-300 p-4 rounded">
    Medium<br/>Line 2
  </div>
</div>`,
    demo: (
      <div className="flex gap-4">
        <div className="flex-1 bg-green-100 p-4 rounded text-sm">Short</div>
        <div className="flex-1 bg-green-200 p-4 rounded text-sm">
          Tall content<br />Line 2<br />Line 3<br />Line 4
        </div>
        <div className="flex-1 bg-green-300 p-4 rounded text-sm">
          Medium<br />Line 2
        </div>
      </div>
    ),
  },
  {
    title: 'Grow Ratios',
    description: 'Control how items share available space using different flex-grow values.',
    properties: [
      {
        css: 'flex-grow: 1 / 2',
        tailwind: 'grow / grow-[2]',
        explanation:
          'flex-grow determines what fraction of the available space an item gets. With items at grow: 1, 2, 1 — item 2 gets 2/4 (50%) of the free space and items 1 and 3 each get 1/4 (25%). Tailwind provides grow (flex-grow: 1), grow-0 (flex-grow: 0), and arbitrary values like grow-[2]. Note: flex-grow distributes free space, not total space — if items have different base sizes, the final widths won\'t be exact ratios.',
      },
    ],
    code: `<div class="flex gap-4">
  <div class="grow bg-amber-200 p-3 rounded">1x</div>
  <div class="grow-[2] bg-amber-300 p-3 rounded">2x</div>
  <div class="grow bg-amber-400 p-3 rounded">1x</div>
</div>`,
    demo: (
      <div className="flex gap-4">
        <div className="grow bg-amber-200 p-3 rounded text-sm text-center">1x</div>
        <div className="grow-[2] bg-amber-300 p-3 rounded text-sm text-center">2x</div>
        <div className="grow bg-amber-400 p-3 rounded text-sm text-center">1x</div>
      </div>
    ),
  },
  {
    title: 'Flex Basis',
    description: 'Set the initial size of items before flex-grow and flex-shrink are applied.',
    properties: [
      {
        css: 'flex-basis',
        tailwind: 'basis-1/3 / basis-2/3',
        explanation:
          'flex-basis sets the initial main-axis size of an item before any growing or shrinking. It\'s like width for row direction (or height for column), but flex-aware. Tailwind provides fractional values: basis-1/2, basis-1/3, basis-2/3, basis-1/4, etc. These map to percentages (33.333%, 66.666%, etc.). Gotcha: flex-basis is overridden by min-width/max-width. When combined with flex-grow: 0, flex-basis acts as a fixed width.',
      },
    ],
    code: `<div class="flex gap-4">
  <div class="basis-1/3 bg-violet-200 p-3 rounded">
    1/3 width
  </div>
  <div class="basis-2/3 bg-violet-300 p-3 rounded">
    2/3 width
  </div>
</div>`,
    demo: (
      <div className="flex gap-4">
        <div className="basis-1/3 bg-violet-200 p-3 rounded text-sm">1/3 width</div>
        <div className="basis-2/3 bg-violet-300 p-3 rounded text-sm">2/3 width</div>
      </div>
    ),
  },
];
