import React from 'react';
import type { FlexPattern } from '../types';

export const wrappingPatterns: FlexPattern[] = [
  {
    title: 'Flex Wrap',
    description: 'Allow items to wrap to the next line when they exceed the container width.',
    properties: [
      {
        css: 'flex-wrap: wrap',
        tailwind: 'flex-wrap',
        explanation:
          'By default, flex items try to fit on one line (flex-wrap: nowrap). Setting flex-wrap: wrap allows items to flow to the next line when there isn\'t enough space. Items maintain their size rather than shrinking. The cross axis now has multiple lines, and align-content (not align-items) controls how those lines are distributed.',
      },
    ],
    code: `<div class="flex flex-wrap gap-3" style="max-width: 300px">
  <div class="w-32 bg-sky-200 p-3 rounded">Item 1</div>
  <div class="w-32 bg-sky-300 p-3 rounded">Item 2</div>
  <div class="w-32 bg-sky-400 p-3 rounded">Item 3</div>
  <div class="w-32 bg-sky-500 p-3 rounded text-white">Item 4</div>
</div>`,
    demo: (
      <div className="flex flex-wrap gap-3" style={{ maxWidth: 300 }}>
        <div className="w-32 bg-sky-200 p-3 rounded">Item 1</div>
        <div className="w-32 bg-sky-300 p-3 rounded">Item 2</div>
        <div className="w-32 bg-sky-400 p-3 rounded">Item 3</div>
        <div className="w-32 bg-sky-500 p-3 rounded text-white">Item 4</div>
      </div>
    ),
  },
  {
    title: 'Wrap Reverse',
    description: 'Items wrap upward instead of downward — the last row appears at the top.',
    properties: [
      {
        css: 'flex-wrap: wrap-reverse',
        tailwind: 'flex-wrap-reverse',
        explanation:
          'Like flex-wrap, but new lines are added above (before) the existing lines instead of below (after). The cross axis is reversed — the first line of items appears at the bottom and wrapped items go upward. Rarely used, but can be helpful for bottom-anchored layouts like chat message areas.',
      },
    ],
    code: `<div class="flex flex-wrap-reverse gap-3" style="max-width: 300px">
  <div class="w-32 bg-rose-200 p-3 rounded">Item 1</div>
  <div class="w-32 bg-rose-300 p-3 rounded">Item 2</div>
  <div class="w-32 bg-rose-400 p-3 rounded">Item 3</div>
  <div class="w-32 bg-rose-500 p-3 rounded text-white">Item 4</div>
</div>`,
    demo: (
      <div className="flex flex-wrap-reverse gap-3" style={{ maxWidth: 300 }}>
        <div className="w-32 bg-rose-200 p-3 rounded">Item 1</div>
        <div className="w-32 bg-rose-300 p-3 rounded">Item 2</div>
        <div className="w-32 bg-rose-400 p-3 rounded">Item 3</div>
        <div className="w-32 bg-rose-500 p-3 rounded text-white">Item 4</div>
      </div>
    ),
  },
  {
    title: 'No Wrap with Truncation',
    description: 'Keep all items on one line and truncate text that overflows.',
    properties: [
      {
        css: 'flex-wrap: nowrap',
        tailwind: 'flex-nowrap',
        explanation:
          'The default behavior — all items stay on one line. If items can\'t fit, they shrink (according to flex-shrink). If they still can\'t fit, they overflow the container.',
      },
      {
        css: 'min-width: 0',
        tailwind: 'min-w-0',
        explanation:
          'Critical for text truncation in flex items. By default, flex items have min-width: auto, which prevents them from shrinking below their content size. Setting min-w-0 allows the item to shrink smaller than its content, enabling text truncation. This is one of the most common flex gotchas.',
      },
      {
        css: 'text-overflow: ellipsis + overflow: hidden + white-space: nowrap',
        tailwind: 'truncate',
        explanation:
          'Tailwind\'s truncate class is a shorthand that sets overflow: hidden, text-overflow: ellipsis, and white-space: nowrap. Combined with min-w-0, text is clipped with an ellipsis when it would overflow.',
      },
    ],
    code: `<div class="flex gap-3" style="max-width: 280px">
  <div class="min-w-0 flex-1 bg-gray-200 p-3 rounded">
    <div class="truncate">Very long text that will be
      truncated with an ellipsis</div>
  </div>
  <div class="shrink-0 bg-gray-300 p-3 rounded">Fixed</div>
</div>`,
    demo: (
      <div className="flex gap-3" style={{ maxWidth: 280 }}>
        <div className="min-w-0 flex-1 bg-gray-200 p-3 rounded">
          <div className="truncate">Very long text that will be truncated with an ellipsis</div>
        </div>
        <div className="shrink-0 bg-gray-300 p-3 rounded">Fixed</div>
      </div>
    ),
  },
  {
    title: 'Wrapping Tag / Chip List',
    description: 'A collection of tags or chips that wrap naturally to fill available space.',
    properties: [
      {
        css: 'flex-wrap: wrap',
        tailwind: 'flex-wrap',
        explanation:
          'Enables wrapping so tags flow to the next line when they run out of horizontal space.',
      },
      {
        css: 'gap',
        tailwind: 'gap-2',
        explanation:
          'Adds consistent spacing between tags in both directions (horizontal and vertical when wrapped). Much cleaner than margin on each tag because gap doesn\'t add space at the outer edges.',
      },
    ],
    code: `<div class="flex flex-wrap gap-2">
  <span class="px-3 py-1 bg-blue-100 text-blue-800
    rounded-full text-sm">React</span>
  <span class="px-3 py-1 bg-green-100 text-green-800
    rounded-full text-sm">TypeScript</span>
  <span class="px-3 py-1 bg-purple-100 text-purple-800
    rounded-full text-sm">Tailwind</span>
  <!-- ...more tags -->
</div>`,
    demo: (
      <div className="flex flex-wrap gap-2">
        {[
          { label: 'React', bg: 'bg-blue-100 text-blue-800' },
          { label: 'TypeScript', bg: 'bg-green-100 text-green-800' },
          { label: 'Tailwind', bg: 'bg-purple-100 text-purple-800' },
          { label: 'Docusaurus', bg: 'bg-orange-100 text-orange-800' },
          { label: 'Flexbox', bg: 'bg-pink-100 text-pink-800' },
          { label: 'CSS', bg: 'bg-cyan-100 text-cyan-800' },
          { label: 'Node.js', bg: 'bg-lime-100 text-lime-800' },
          { label: 'GraphQL', bg: 'bg-red-100 text-red-800' },
        ].map((tag) => (
          <span key={tag.label} className={`px-3 py-1 ${tag.bg} rounded-full text-sm`}>
            {tag.label}
          </span>
        ))}
      </div>
    ),
  },
];
