import React from 'react';
import type { FlexPattern } from '../types';

export const alignmentPatterns: FlexPattern[] = [
  {
    title: 'Center Both Axes',
    description: 'Center a child element both horizontally and vertically within its parent.',
    properties: [
      {
        css: 'display: flex',
        tailwind: 'flex',
        explanation:
          'Enables the flex formatting context on the container. All direct children become flex items that can be aligned using flex properties. Without this, justify-content and align-items have no effect.',
      },
      {
        css: 'justify-content: center',
        tailwind: 'justify-center',
        explanation:
          'Centers flex items along the main axis (horizontal by default). This controls the distribution of space around items. Other values: flex-start (default), flex-end, space-between, space-around, space-evenly.',
      },
      {
        css: 'align-items: center',
        tailwind: 'items-center',
        explanation:
          'Centers flex items along the cross axis (vertical by default). This controls how items are positioned perpendicular to the main axis. Other values: stretch (default — items fill the container height), flex-start, flex-end, baseline.',
      },
    ],
    code: `<div class="flex items-center justify-center h-48">
  <div class="w-24 h-24 bg-blue-500 rounded" />
</div>`,
    demo: (
      <div className="flex items-center justify-center h-48">
        <div className="w-24 h-24 bg-blue-500 rounded" />
      </div>
    ),
  },
  {
    title: 'Center Horizontally Only',
    description: 'Center items along the main axis while leaving the cross axis at default (stretch).',
    properties: [
      {
        css: 'justify-content: center',
        tailwind: 'justify-center',
        explanation:
          'Centers items along the main axis. When flex-direction is row (the default), this centers items horizontally. The cross axis (vertical) uses the default align-items: stretch, so items fill the full height of the container.',
      },
    ],
    code: `<div class="flex justify-center h-32">
  <div class="w-24 bg-blue-400 rounded">Centered</div>
</div>`,
    demo: (
      <div className="flex justify-center h-32">
        <div className="w-24 bg-blue-400 rounded flex items-center justify-center text-sm">
          Centered
        </div>
      </div>
    ),
  },
  {
    title: 'Center Vertically Only',
    description: 'Center items along the cross axis while leaving horizontal alignment at default.',
    properties: [
      {
        css: 'align-items: center',
        tailwind: 'items-center',
        explanation:
          'Centers items along the cross axis. In the default row direction, this centers items vertically. Items keep their natural width and are placed at the start of the main axis (left in LTR). Gotcha: the container needs a defined height for vertical centering to be visible.',
      },
    ],
    code: `<div class="flex items-center h-32">
  <div class="w-24 bg-green-400 rounded p-2">Centered</div>
</div>`,
    demo: (
      <div className="flex items-center h-32">
        <div className="w-24 bg-green-400 rounded p-2 text-sm">Centered</div>
      </div>
    ),
  },
  {
    title: 'Align Items to Baseline',
    description: 'Align items so their text baselines line up, regardless of different font sizes or padding.',
    properties: [
      {
        css: 'align-items: baseline',
        tailwind: 'items-baseline',
        explanation:
          'Aligns flex items so the first line of text in each item shares the same baseline. Useful when items have different font sizes, padding, or heights — their text still lines up visually. Compare with items-center where the boxes themselves are centered, which can misalign text.',
      },
    ],
    code: `<div class="flex items-baseline gap-4 p-4">
  <div class="text-3xl bg-yellow-100 p-2">Big</div>
  <div class="text-sm bg-yellow-200 p-4">Small</div>
  <div class="text-xl bg-yellow-300 p-1">Medium</div>
</div>`,
    demo: (
      <div className="flex items-baseline gap-4 p-4">
        <div className="text-3xl bg-yellow-100 p-2 rounded">Big</div>
        <div className="text-sm bg-yellow-200 p-4 rounded">Small</div>
        <div className="text-xl bg-yellow-300 p-1 rounded">Medium</div>
      </div>
    ),
  },
  {
    title: 'Align-Self Override',
    description: 'Override the container\'s align-items for individual children using align-self.',
    properties: [
      {
        css: 'align-items: center',
        tailwind: 'items-center',
        explanation:
          'Sets the default cross-axis alignment for all children. Individual children can override this.',
      },
      {
        css: 'align-self: flex-start',
        tailwind: 'self-start',
        explanation:
          'Overrides the parent\'s align-items for this specific child, pushing it to the start of the cross axis. This is the only flex property that applies to individual items rather than the container. Values: auto (inherit parent), flex-start, flex-end, center, baseline, stretch.',
      },
      {
        css: 'align-self: flex-end',
        tailwind: 'self-end',
        explanation:
          'Pushes this specific child to the end of the cross axis (bottom, in the default row direction). Useful for placing a single element differently from its siblings without changing the container.',
      },
    ],
    code: `<div class="flex items-center h-32 gap-4">
  <div class="self-start bg-pink-200 p-2">Start</div>
  <div class="bg-pink-300 p-2">Center (default)</div>
  <div class="self-end bg-pink-400 p-2">End</div>
</div>`,
    demo: (
      <div className="flex items-center h-32 gap-4">
        <div className="self-start bg-pink-200 p-2 rounded text-sm">Start</div>
        <div className="bg-pink-300 p-2 rounded text-sm">Center (default)</div>
        <div className="self-end bg-pink-400 p-2 rounded text-sm">End</div>
      </div>
    ),
  },
  {
    title: 'Distribute Items Evenly',
    description: 'Space items with equal gaps between and around them, including at the edges.',
    properties: [
      {
        css: 'justify-content: space-evenly',
        tailwind: 'justify-evenly',
        explanation:
          'Distributes items so the space between any two adjacent items — and the space before the first and after the last item — is exactly equal. Compare with space-between (no space at edges), space-around (half-space at edges), and space-evenly (equal space everywhere). This is the most visually balanced distribution.',
      },
    ],
    code: `<div class="flex justify-evenly p-4">
  <div class="bg-indigo-200 p-3 rounded">A</div>
  <div class="bg-indigo-300 p-3 rounded">B</div>
  <div class="bg-indigo-400 p-3 rounded">C</div>
</div>`,
    demo: (
      <div className="flex justify-evenly p-4">
        <div className="bg-indigo-200 p-3 rounded">A</div>
        <div className="bg-indigo-300 p-3 rounded">B</div>
        <div className="bg-indigo-400 p-3 rounded">C</div>
      </div>
    ),
  },
];
