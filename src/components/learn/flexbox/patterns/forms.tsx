import React from 'react';
import type { FlexPattern } from '../types';

export const formPatterns: FlexPattern[] = [
  {
    title: 'Input with Button',
    description: 'A text input that fills available space next to a fixed-width submit button.',
    properties: [
      {
        css: 'flex: 1 1 0%',
        tailwind: 'flex-1',
        explanation:
          'Applied to the input so it stretches to fill all remaining space after the button takes its natural width. The input grows and shrinks with the container while the button stays fixed.',
      },
      {
        css: 'gap',
        tailwind: 'gap-2',
        explanation:
          'Adds spacing between the input and button. Cleaner than margin-right on the input because it only applies between items.',
      },
    ],
    code: `<div class="flex gap-2">
  <input class="flex-1 border rounded px-3 py-2"
    placeholder="Enter text..." />
  <button class="px-4 py-2 bg-blue-500
    text-white rounded">Submit</button>
</div>`,
    demo: (
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2 text-sm"
          placeholder="Enter text..."
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded text-sm">Submit</button>
      </div>
    ),
  },
  {
    title: 'Search Bar with Icon',
    description: 'A search input with an icon inside it and a search button — common in headers.',
    properties: [
      {
        css: 'position: relative + absolute',
        tailwind: 'relative / absolute',
        explanation:
          'The icon is positioned absolutely inside the input\'s container. The container is position: relative so the icon is positioned relative to it. The input gets left padding to make room for the icon. This is a common pattern that combines positioning with flex for the overall layout.',
      },
      {
        css: 'flex: 1 1 0%',
        tailwind: 'flex-1',
        explanation:
          'Applied to the input container so the search field stretches to fill available space. The button maintains its natural width.',
      },
    ],
    code: `<div class="flex gap-2">
  <div class="relative flex-1">
    <span class="absolute left-3 top-1/2
      -translate-y-1/2 text-gray-400">🔍</span>
    <input class="w-full border rounded pl-10
      pr-3 py-2" placeholder="Search..." />
  </div>
  <button class="px-4 py-2 bg-blue-500
    text-white rounded">Search</button>
</div>`,
    demo: (
      <div className="flex gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            &#x1F50D;
          </span>
          <input
            className="w-full border rounded pl-10 pr-3 py-2 text-sm"
            placeholder="Search..."
          />
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded text-sm">Search</button>
      </div>
    ),
  },
  {
    title: 'Inline Form Row',
    description: 'Label, input, and helper text arranged horizontally in a single row.',
    properties: [
      {
        css: 'align-items: center',
        tailwind: 'items-center',
        explanation:
          'Vertically centers the label, input, and helper text on the same line. This is the horizontal form layout common in settings pages where vertical space is limited.',
      },
      {
        css: 'flex: 1 1 0%',
        tailwind: 'flex-1',
        explanation:
          'Applied to the input so it fills the space between the fixed-width label and the helper text. The label and helper text keep their natural widths.',
      },
      {
        css: 'flex-shrink: 0',
        tailwind: 'shrink-0',
        explanation:
          'Applied to the label to prevent it from shrinking. Labels should always remain fully readable.',
      },
    ],
    code: `<div class="flex items-center gap-4">
  <label class="shrink-0 font-medium text-sm
    w-24">Username</label>
  <input class="flex-1 border rounded px-3 py-2" />
  <span class="shrink-0 text-xs text-gray-500">
    3-20 characters</span>
</div>`,
    demo: (
      <div className="flex items-center gap-3">
        <label className="shrink-0 font-medium text-sm w-20">Username</label>
        <input className="flex-1 border rounded px-3 py-1.5 text-sm" placeholder="johndoe" />
        <span className="shrink-0 text-xs text-gray-500">3-20 chars</span>
      </div>
    ),
  },
];
