import React from 'react';
import type { FlexPattern } from '../types';

export const spacingPatterns: FlexPattern[] = [
  {
    title: 'Space Between',
    description: 'Push items to opposite ends of the container with no space at the edges.',
    properties: [
      {
        css: 'justify-content: space-between',
        tailwind: 'justify-between',
        explanation:
          'Distributes items so the first item is flush with the start and the last is flush with the end, with equal space between each pair. This is the most common distribution for navbars (logo left, links right) and list rows (label left, value right). With only 2 items, it pushes them to opposite ends.',
      },
    ],
    code: `<div class="flex justify-between p-4">
  <div class="bg-blue-200 px-4 py-2 rounded">Left</div>
  <div class="bg-blue-200 px-4 py-2 rounded">Right</div>
</div>`,
    demo: (
      <div className="flex justify-between p-4">
        <div className="bg-blue-200 px-4 py-2 rounded">Left</div>
        <div className="bg-blue-200 px-4 py-2 rounded">Right</div>
      </div>
    ),
  },
  {
    title: 'Space Around',
    description: 'Items get equal space on both sides, resulting in half-space at the edges.',
    properties: [
      {
        css: 'justify-content: space-around',
        tailwind: 'justify-around',
        explanation:
          'Each item gets equal margin on both sides. This means the space between two adjacent items is double the space at the edges (each item contributes its margin). Compare: space-between has no edge space, space-around has half-edge space, space-evenly has equal edge space.',
      },
    ],
    code: `<div class="flex justify-around p-4">
  <div class="bg-teal-200 p-3 rounded">A</div>
  <div class="bg-teal-300 p-3 rounded">B</div>
  <div class="bg-teal-400 p-3 rounded">C</div>
</div>`,
    demo: (
      <div className="flex justify-around p-4">
        <div className="bg-teal-200 p-3 rounded">A</div>
        <div className="bg-teal-300 p-3 rounded">B</div>
        <div className="bg-teal-400 p-3 rounded">C</div>
      </div>
    ),
  },
  {
    title: 'Space Evenly',
    description: 'Equal space between all items and at both edges — the most balanced distribution.',
    properties: [
      {
        css: 'justify-content: space-evenly',
        tailwind: 'justify-evenly',
        explanation:
          'Creates perfectly equal spacing everywhere: before the first item, between each pair, and after the last item. This gives the most visually balanced result. Useful for toolbar buttons, pagination, or any row where you want items perfectly distributed.',
      },
    ],
    code: `<div class="flex justify-evenly p-4">
  <div class="bg-amber-200 p-3 rounded">A</div>
  <div class="bg-amber-300 p-3 rounded">B</div>
  <div class="bg-amber-400 p-3 rounded">C</div>
</div>`,
    demo: (
      <div className="flex justify-evenly p-4">
        <div className="bg-amber-200 p-3 rounded">A</div>
        <div className="bg-amber-300 p-3 rounded">B</div>
        <div className="bg-amber-400 p-3 rounded">C</div>
      </div>
    ),
  },
  {
    title: 'Row and Column Gap',
    description: 'Use different gap sizes for horizontal and vertical spacing.',
    properties: [
      {
        css: 'row-gap / column-gap',
        tailwind: 'gap-x-2 gap-y-4',
        explanation:
          'gap is shorthand for row-gap and column-gap. Use gap-x-N and gap-y-N for independent control. gap-x controls horizontal spacing (between columns), gap-y controls vertical spacing (between rows when items wrap). This is cleaner than margin because it only adds space between items, never at the edges. Works with both flex and grid.',
      },
    ],
    code: `<div class="flex flex-wrap gap-x-8 gap-y-2">
  <div class="bg-cyan-200 px-4 py-2 rounded">Wide gap-x</div>
  <div class="bg-cyan-300 px-4 py-2 rounded">Between</div>
  <div class="bg-cyan-400 px-4 py-2 rounded">Columns</div>
  <div class="bg-cyan-200 px-4 py-2 rounded">Narrow gap-y</div>
  <div class="bg-cyan-300 px-4 py-2 rounded">Between</div>
  <div class="bg-cyan-400 px-4 py-2 rounded">Rows</div>
</div>`,
    demo: (
      <div className="flex flex-wrap gap-x-8 gap-y-2">
        <div className="bg-cyan-200 px-4 py-2 rounded text-sm">Wide gap-x</div>
        <div className="bg-cyan-300 px-4 py-2 rounded text-sm">Between</div>
        <div className="bg-cyan-400 px-4 py-2 rounded text-sm">Columns</div>
        <div className="bg-cyan-200 px-4 py-2 rounded text-sm">Narrow gap-y</div>
        <div className="bg-cyan-300 px-4 py-2 rounded text-sm">Between</div>
        <div className="bg-cyan-400 px-4 py-2 rounded text-sm">Rows</div>
      </div>
    ),
  },
  {
    title: 'Auto Margins',
    description: 'Use margin-left: auto to push an item to the far right — a powerful flex trick.',
    properties: [
      {
        css: 'margin-left: auto',
        tailwind: 'ml-auto',
        explanation:
          'In a flex container, auto margins absorb all available free space in that direction. ml-auto pushes an item (and everything after it) to the right. This is extremely useful for navbars: put ml-auto on the first right-aligned item instead of using justify-between. You can also use mr-auto, mt-auto, mb-auto. Gotcha: auto margins take priority over justify-content.',
      },
    ],
    code: `<div class="flex gap-4 p-4">
  <div class="bg-lime-200 p-3 rounded">Home</div>
  <div class="bg-lime-300 p-3 rounded">About</div>
  <div class="ml-auto bg-lime-400 p-3 rounded">Login</div>
</div>`,
    demo: (
      <div className="flex gap-4 p-4">
        <div className="bg-lime-200 p-3 rounded text-sm">Home</div>
        <div className="bg-lime-300 p-3 rounded text-sm">About</div>
        <div className="ml-auto bg-lime-400 p-3 rounded text-sm">Login</div>
      </div>
    ),
  },
  {
    title: 'Vertical Stack with Gap',
    description: 'Stack items vertically with consistent spacing using flex-col and gap.',
    properties: [
      {
        css: 'flex-direction: column',
        tailwind: 'flex-col',
        explanation:
          'Switches to vertical stacking. Combined with gap, this is the cleanest way to create evenly spaced vertical lists.',
      },
      {
        css: 'gap',
        tailwind: 'gap-3',
        explanation:
          'Adds consistent spacing between stacked items. In a column layout, gap applies vertically. This replaces the common pattern of adding margin-bottom to every child (which leaves unwanted space after the last item).',
      },
    ],
    code: `<div class="flex flex-col gap-3">
  <div class="p-3 bg-purple-100 rounded">Item 1</div>
  <div class="p-3 bg-purple-200 rounded">Item 2</div>
  <div class="p-3 bg-purple-300 rounded">Item 3</div>
</div>`,
    demo: (
      <div className="flex flex-col gap-3">
        <div className="p-3 bg-purple-100 rounded">Item 1</div>
        <div className="p-3 bg-purple-200 rounded">Item 2</div>
        <div className="p-3 bg-purple-300 rounded">Item 3</div>
      </div>
    ),
  },
];
