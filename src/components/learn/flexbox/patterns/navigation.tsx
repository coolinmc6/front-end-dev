import React from 'react';
import type { FlexPattern } from '../types';

export const navigationPatterns: FlexPattern[] = [
  {
    title: 'Basic Navbar',
    description: 'Logo on the left, navigation links on the right, vertically centered.',
    properties: [
      {
        css: 'justify-content: space-between',
        tailwind: 'justify-between',
        explanation:
          'Pushes the logo and nav links to opposite ends. This is the most common navbar pattern — two groups of content separated by maximum space.',
      },
      {
        css: 'align-items: center',
        tailwind: 'items-center',
        explanation:
          'Vertically centers the logo and links within the navbar height. Without this, items would stretch to fill the navbar height (the default stretch behavior).',
      },
    ],
    code: `<nav class="flex justify-between items-center
  px-6 py-3 bg-gray-800 text-white">
  <div class="font-bold text-lg">Logo</div>
  <div class="flex gap-6">
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Contact</a>
  </div>
</nav>`,
    demo: (
      <nav className="flex justify-between items-center px-6 py-3 bg-gray-800 text-white rounded">
        <div className="font-bold text-lg">Logo</div>
        <div className="flex gap-6 text-sm">
          <span className="hover:underline cursor-pointer">Home</span>
          <span className="hover:underline cursor-pointer">About</span>
          <span className="hover:underline cursor-pointer">Contact</span>
        </div>
      </nav>
    ),
  },
  {
    title: 'Navbar with Center Section',
    description: 'Three-section navbar: logo left, links centered, actions right.',
    properties: [
      {
        css: 'flex: 1 1 0%',
        tailwind: 'flex-1',
        explanation:
          'Giving all three sections flex-1 makes them share space equally. The center section uses text-center (or justify-center on a nested flex) to center its content. The key insight: each section takes 1/3 of the navbar width, and the center section\'s content is centered within its 1/3.',
      },
      {
        css: 'justify-content: center',
        tailwind: 'justify-center',
        explanation:
          'Applied to the center section (as a nested flex container) to center the nav links within its equal-width slice of the navbar.',
      },
      {
        css: 'justify-content: flex-end',
        tailwind: 'justify-end',
        explanation:
          'Applied to the right section to push its content (buttons, avatar) to the right edge.',
      },
    ],
    code: `<nav class="flex items-center px-6 py-3
  bg-gray-800 text-white">
  <div class="flex-1">Logo</div>
  <div class="flex-1 flex justify-center gap-6">
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Blog</a>
  </div>
  <div class="flex-1 flex justify-end">
    <button>Sign In</button>
  </div>
</nav>`,
    demo: (
      <nav className="flex items-center px-6 py-3 bg-gray-800 text-white rounded">
        <div className="flex-1 font-bold">Logo</div>
        <div className="flex-1 flex justify-center gap-6 text-sm">
          <span className="hover:underline cursor-pointer">Home</span>
          <span className="hover:underline cursor-pointer">About</span>
          <span className="hover:underline cursor-pointer">Blog</span>
        </div>
        <div className="flex-1 flex justify-end">
          <span className="px-3 py-1 bg-blue-600 rounded text-sm cursor-pointer">Sign In</span>
        </div>
      </nav>
    ),
  },
  {
    title: 'Navbar with Search + Avatar',
    description: 'Complex navbar with logo, search bar that fills space, and user actions.',
    properties: [
      {
        css: 'flex: 1 1 0%',
        tailwind: 'flex-1',
        explanation:
          'Applied to the search input so it stretches to fill all available space between the fixed-width logo and the user actions area. This is the fixed + flexible pattern applied to a navbar.',
      },
      {
        css: 'flex-shrink: 0',
        tailwind: 'shrink-0',
        explanation:
          'Applied to the logo and the right-side actions so they maintain their natural width and don\'t shrink as the search bar grows.',
      },
    ],
    code: `<nav class="flex items-center gap-4 px-6 py-3
  bg-gray-800 text-white">
  <div class="shrink-0 font-bold">Logo</div>
  <input class="flex-1 px-3 py-1.5 rounded
    bg-gray-700 text-white" placeholder="Search..." />
  <div class="shrink-0 flex items-center gap-3">
    <span>🔔</span>
    <div class="w-8 h-8 bg-blue-500 rounded-full" />
  </div>
</nav>`,
    demo: (
      <nav className="flex items-center gap-4 px-6 py-3 bg-gray-800 text-white rounded">
        <div className="shrink-0 font-bold">Logo</div>
        <input
          className="flex-1 px-3 py-1.5 rounded bg-gray-700 text-white border-none"
          placeholder="Search..."
        />
        <div className="shrink-0 flex items-center gap-3">
          <span>&#x1F514;</span>
          <div className="w-8 h-8 bg-blue-500 rounded-full" />
        </div>
      </nav>
    ),
  },
  {
    title: 'Vertical Sidebar Menu',
    description: 'A vertical navigation menu using flex-col with active state highlighting.',
    properties: [
      {
        css: 'flex-direction: column',
        tailwind: 'flex-col',
        explanation:
          'Stacks menu items vertically. Combined with full-width items, this creates a sidebar navigation. Each item stretches to fill the width of the sidebar by default (align-items: stretch).',
      },
      {
        css: 'gap',
        tailwind: 'gap-1',
        explanation:
          'Adds small consistent spacing between menu items. Using gap instead of margin keeps the spacing uniform and avoids double-margin issues.',
      },
    ],
    code: `<nav class="flex flex-col gap-1 w-48 bg-gray-100
  p-3 rounded">
  <a class="px-3 py-2 rounded bg-blue-500
    text-white">Dashboard</a>
  <a class="px-3 py-2 rounded
    hover:bg-gray-200">Projects</a>
  <a class="px-3 py-2 rounded
    hover:bg-gray-200">Settings</a>
  <a class="px-3 py-2 rounded
    hover:bg-gray-200">Help</a>
</nav>`,
    demo: (
      <nav className="flex flex-col gap-1 w-48 bg-gray-100 p-3 rounded">
        <div className="px-3 py-2 rounded bg-blue-500 text-white text-sm cursor-pointer">
          Dashboard
        </div>
        <div className="px-3 py-2 rounded hover:bg-gray-200 text-sm cursor-pointer">Projects</div>
        <div className="px-3 py-2 rounded hover:bg-gray-200 text-sm cursor-pointer">Settings</div>
        <div className="px-3 py-2 rounded hover:bg-gray-200 text-sm cursor-pointer">Help</div>
      </nav>
    ),
  },
  {
    title: 'Breadcrumbs',
    description: 'Inline navigation path with separator characters between items.',
    properties: [
      {
        css: 'align-items: center',
        tailwind: 'items-center',
        explanation:
          'Vertically centers the breadcrumb items and their separators, ensuring everything aligns on the same horizontal line regardless of font size or padding differences.',
      },
      {
        css: 'gap',
        tailwind: 'gap-2',
        explanation:
          'Adds uniform spacing between breadcrumb items and separators. Each separator is a separate element so gap applies consistently.',
      },
    ],
    code: `<nav class="flex items-center gap-2 text-sm">
  <a class="text-blue-600 hover:underline">Home</a>
  <span class="text-gray-400">/</span>
  <a class="text-blue-600 hover:underline">Products</a>
  <span class="text-gray-400">/</span>
  <span class="text-gray-600">Widget</span>
</nav>`,
    demo: (
      <nav className="flex items-center gap-2 text-sm">
        <span className="text-blue-600 hover:underline cursor-pointer">Home</span>
        <span className="text-gray-400">/</span>
        <span className="text-blue-600 hover:underline cursor-pointer">Products</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-600">Widget</span>
      </nav>
    ),
  },
  {
    title: 'Tab Bar / Bottom Nav',
    description: 'Evenly spaced icon + label buttons for mobile-style bottom navigation.',
    properties: [
      {
        css: 'justify-content: space-around',
        tailwind: 'justify-around',
        explanation:
          'Distributes tab items evenly with equal space around each. For bottom navs, space-around or justify-evenly both work well. space-around gives half-space at edges, which usually looks right for a bar that spans the full width.',
      },
      {
        css: 'flex-direction: column',
        tailwind: 'flex-col',
        explanation:
          'Applied to each tab item (nested flex) to stack the icon above the label vertically.',
      },
    ],
    code: `<div class="flex justify-around py-2
  bg-gray-100 border-t">
  <div class="flex flex-col items-center gap-1">
    <span>🏠</span><span class="text-xs">Home</span>
  </div>
  <div class="flex flex-col items-center gap-1">
    <span>🔍</span><span class="text-xs">Search</span>
  </div>
  <div class="flex flex-col items-center gap-1">
    <span>👤</span><span class="text-xs">Profile</span>
  </div>
</div>`,
    demo: (
      <div className="flex justify-around py-2 bg-gray-100 border-t rounded">
        <div className="flex flex-col items-center gap-1 cursor-pointer">
          <span>&#x1F3E0;</span>
          <span className="text-xs">Home</span>
        </div>
        <div className="flex flex-col items-center gap-1 cursor-pointer">
          <span>&#x1F50D;</span>
          <span className="text-xs">Search</span>
        </div>
        <div className="flex flex-col items-center gap-1 cursor-pointer">
          <span>&#x1F464;</span>
          <span className="text-xs">Profile</span>
        </div>
      </div>
    ),
  },
];
