import React from 'react';
import type { FlexPattern } from '../types';

export const layoutPatterns: FlexPattern[] = [
  {
    title: 'Sidebar Layout',
    description: 'A fixed-width sidebar alongside a flexible main content area.',
    properties: [
      {
        css: 'flex-shrink: 0',
        tailwind: 'shrink-0',
        explanation:
          'Applied to the sidebar to prevent it from shrinking when the main content area is large or the viewport is narrow. Without shrink-0, the sidebar would compress when space is tight.',
      },
      {
        css: 'flex: 1 1 0%',
        tailwind: 'flex-1',
        explanation:
          'Applied to the main content area so it fills all remaining horizontal space. As the viewport changes width, only the main area resizes while the sidebar stays fixed.',
      },
    ],
    code: `<div class="flex h-64">
  <aside class="shrink-0 w-48 bg-gray-200 p-4">
    Sidebar
  </aside>
  <main class="flex-1 p-4">
    Main Content
  </main>
</div>`,
    demo: (
      <div className="flex h-48 rounded overflow-hidden">
        <aside className="shrink-0 w-36 bg-gray-200 p-3 text-sm">Sidebar</aside>
        <main className="flex-1 p-3 text-sm bg-white border-l">Main Content</main>
      </div>
    ),
  },
  {
    title: 'Holy Grail Layout',
    description: 'The classic layout: header, three-column body (nav, main, aside), and footer.',
    properties: [
      {
        css: 'flex-direction: column',
        tailwind: 'flex-col',
        explanation:
          'The outer container uses flex-col to stack header, body, and footer vertically. The body section is itself a flex row for the three columns.',
      },
      {
        css: 'flex: 1 1 0%',
        tailwind: 'flex-1',
        explanation:
          'Applied to the body section so it fills all vertical space between header and footer. Also applied to the main column inside the body so it fills the space between the two sidebars.',
      },
    ],
    code: `<div class="flex flex-col h-64">
  <header class="bg-gray-800 text-white p-3">
    Header
  </header>
  <div class="flex flex-1">
    <nav class="w-32 bg-gray-200 p-3">Nav</nav>
    <main class="flex-1 p-3">Main</main>
    <aside class="w-32 bg-gray-200 p-3">Aside</aside>
  </div>
  <footer class="bg-gray-800 text-white p-3">
    Footer
  </footer>
</div>`,
    demo: (
      <div className="flex flex-col h-48 rounded overflow-hidden">
        <header className="bg-gray-800 text-white p-2 text-sm">Header</header>
        <div className="flex flex-1">
          <nav className="w-20 bg-gray-200 p-2 text-sm">Nav</nav>
          <main className="flex-1 p-2 text-sm">Main</main>
          <aside className="w-20 bg-gray-200 p-2 text-sm">Aside</aside>
        </div>
        <footer className="bg-gray-800 text-white p-2 text-sm">Footer</footer>
      </div>
    ),
  },
  {
    title: 'Sticky Footer Page',
    description: 'Content pushes the footer to the bottom, even when content is short.',
    properties: [
      {
        css: 'flex-direction: column',
        tailwind: 'flex-col',
        explanation:
          'The page container stacks vertically: content area then footer.',
      },
      {
        css: 'min-height: 100vh',
        tailwind: 'min-h-screen',
        explanation:
          'Ensures the page container is at least the full viewport height. If content is short, the container still fills the screen. The footer stays at the bottom because flex-1 on the main area absorbs all the extra vertical space.',
      },
      {
        css: 'flex: 1 1 0%',
        tailwind: 'flex-1',
        explanation:
          'Applied to the main content area. It grows to fill all available vertical space, pushing the footer to the very bottom of the page regardless of content height.',
      },
    ],
    code: `<div class="flex flex-col min-h-screen">
  <header class="bg-gray-800 text-white p-4">
    Header
  </header>
  <main class="flex-1 p-4">
    Short content — footer still at bottom
  </main>
  <footer class="bg-gray-800 text-white p-4">
    Footer
  </footer>
</div>`,
    demo: (
      <div className="flex flex-col h-48 rounded overflow-hidden">
        <header className="bg-gray-800 text-white p-2 text-sm">Header</header>
        <main className="flex-1 p-3 text-sm">Short content — footer still at bottom</main>
        <footer className="bg-gray-800 text-white p-2 text-sm">Footer</footer>
      </div>
    ),
  },
  {
    title: 'Dashboard Layout',
    description: 'Full-height sidebar with a top header bar and main content area.',
    properties: [
      {
        css: 'flex-direction: column',
        tailwind: 'flex-col',
        explanation:
          'Used on the right-side container to stack the header bar above the main content vertically.',
      },
      {
        css: 'height: 100vh',
        tailwind: 'h-screen',
        explanation:
          'Makes the outer container fill the viewport height. The sidebar spans full height, and the right column fills the remaining width.',
      },
    ],
    code: `<div class="flex h-screen">
  <aside class="shrink-0 w-48 bg-gray-900 text-white
    p-4">Sidebar</aside>
  <div class="flex flex-col flex-1">
    <header class="shrink-0 bg-white border-b p-4">
      Top bar
    </header>
    <main class="flex-1 p-4 bg-gray-50 overflow-auto">
      Dashboard content
    </main>
  </div>
</div>`,
    demo: (
      <div className="flex h-48 rounded overflow-hidden">
        <aside className="shrink-0 w-28 bg-gray-900 text-white p-2 text-sm">Sidebar</aside>
        <div className="flex flex-col flex-1">
          <header className="shrink-0 bg-white border-b p-2 text-sm">Top bar</header>
          <main className="flex-1 p-2 bg-gray-50 text-sm">Dashboard content</main>
        </div>
      </div>
    ),
  },
  {
    title: 'Split Screen 50/50',
    description: 'Two equal-width panes side by side, each filling half the screen.',
    properties: [
      {
        css: 'flex: 1 1 0%',
        tailwind: 'flex-1',
        explanation:
          'Applied to both panes so they share space equally. Since flex-basis is 0%, both panes ignore their content size and split the container exactly in half. Common for login pages (form + hero image), comparison views, or side-by-side editors.',
      },
    ],
    code: `<div class="flex h-64">
  <div class="flex-1 bg-blue-600 text-white
    flex items-center justify-center">
    Left Pane
  </div>
  <div class="flex-1 bg-gray-100
    flex items-center justify-center">
    Right Pane
  </div>
</div>`,
    demo: (
      <div className="flex h-48 rounded overflow-hidden">
        <div className="flex-1 bg-blue-600 text-white flex items-center justify-center text-sm">
          Left Pane
        </div>
        <div className="flex-1 bg-gray-100 flex items-center justify-center text-sm">
          Right Pane
        </div>
      </div>
    ),
  },
];
