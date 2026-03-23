import React from 'react';
import type { FlexPattern } from '../types';

export const mediaListPatterns: FlexPattern[] = [
  {
    title: 'Song / Track Row',
    description: 'Album art, track name, artist, album, and duration — like a music player list.',
    properties: [
      {
        css: 'align-items: center',
        tailwind: 'items-center',
        explanation:
          'Vertically centers the album art, text columns, and duration so they all align on the same horizontal line. This is essential when mixing a square image with single-line text.',
      },
      {
        css: 'flex-shrink: 0',
        tailwind: 'shrink-0',
        explanation:
          'Applied to the album art and the duration text so they maintain fixed sizes. The track/artist/album text in the middle is the flexible portion that truncates when space is tight.',
      },
      {
        css: 'min-width: 0',
        tailwind: 'min-w-0',
        explanation:
          'Applied to the text section so it can shrink and enable text truncation. Without this, the track name would push the duration off-screen on narrow viewports.',
      },
    ],
    code: `<div class="flex items-center gap-3 p-3
  hover:bg-gray-50 rounded">
  <div class="shrink-0 w-10 h-10 bg-gray-300
    rounded" />
  <div class="min-w-0 flex-1">
    <div class="font-medium truncate">
      Track Name Here</div>
    <div class="text-sm text-gray-500 truncate">
      Artist Name — Album Title</div>
  </div>
  <div class="shrink-0 text-sm text-gray-500">
    3:42</div>
</div>`,
    demo: (
      <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded cursor-pointer">
        <div className="shrink-0 w-10 h-10 bg-gradient-to-br from-pink-500 to-violet-500 rounded" />
        <div className="min-w-0 flex-1">
          <div className="font-medium text-sm truncate">Bohemian Rhapsody</div>
          <div className="text-xs text-gray-500 truncate">Queen — A Night at the Opera</div>
        </div>
        <div className="shrink-0 text-xs text-gray-500">5:55</div>
      </div>
    ),
  },
  {
    title: 'Playlist',
    description: 'Multiple song rows stacked vertically with dividers — a complete list view.',
    properties: [
      {
        css: 'flex-direction: column',
        tailwind: 'flex-col',
        explanation:
          'Stacks the song rows vertically. Each row is a horizontal flex container (nested flex), creating a flex-in-flex pattern. The outer flex-col handles the vertical list, inner flex handles each row.',
      },
      {
        css: 'divide',
        tailwind: 'divide-y',
        explanation:
          'A Tailwind utility (not a flex property) that adds border-top to all children except the first. Cleaner than manually adding borders — works well with flex-col lists.',
      },
    ],
    code: `<div class="flex flex-col divide-y border rounded">
  <!-- Repeat for each track -->
  <div class="flex items-center gap-3 p-3">
    <span class="text-sm text-gray-400 w-6">1</span>
    <div class="shrink-0 w-10 h-10
      bg-gray-300 rounded" />
    <div class="min-w-0 flex-1">
      <div class="font-medium truncate">Track</div>
      <div class="text-sm text-gray-500">Artist</div>
    </div>
    <div class="text-sm text-gray-500">3:42</div>
  </div>
</div>`,
    demo: (
      <div className="flex flex-col divide-y border rounded">
        {[
          { num: 1, title: 'Bohemian Rhapsody', artist: 'Queen', time: '5:55', color: 'from-pink-500 to-violet-500' },
          { num: 2, title: 'Hotel California', artist: 'Eagles', time: '6:30', color: 'from-amber-500 to-orange-500' },
          { num: 3, title: 'Stairway to Heaven', artist: 'Led Zeppelin', time: '8:02', color: 'from-green-500 to-teal-500' },
          { num: 4, title: 'Imagine', artist: 'John Lennon', time: '3:07', color: 'from-blue-500 to-cyan-500' },
        ].map((track) => (
          <div key={track.num} className="flex items-center gap-3 p-2 hover:bg-gray-50 cursor-pointer">
            <span className="text-xs text-gray-400 w-5 text-right">{track.num}</span>
            <div className={`shrink-0 w-8 h-8 bg-gradient-to-br ${track.color} rounded`} />
            <div className="min-w-0 flex-1">
              <div className="font-medium text-sm truncate">{track.title}</div>
              <div className="text-xs text-gray-500">{track.artist}</div>
            </div>
            <div className="shrink-0 text-xs text-gray-500">{track.time}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'User Row',
    description: 'Avatar, user name, role, and a status badge — common in admin interfaces.',
    properties: [
      {
        css: 'align-items: center',
        tailwind: 'items-center',
        explanation:
          'Vertically centers the avatar, name/role text, and the status badge. Critical for aligning a circular avatar with text of different line heights.',
      },
      {
        css: 'margin-left: auto',
        tailwind: 'ml-auto',
        explanation:
          'Applied to the status badge to push it to the far right of the row. An alternative to justify-between when you only want the last item pushed to the end.',
      },
    ],
    code: `<div class="flex items-center gap-3 p-3">
  <div class="w-10 h-10 bg-blue-500
    rounded-full" />
  <div>
    <div class="font-medium">Jane Smith</div>
    <div class="text-sm text-gray-500">Engineer</div>
  </div>
  <span class="ml-auto px-2 py-1 bg-green-100
    text-green-800 rounded-full text-xs">Active</span>
</div>`,
    demo: (
      <div className="flex items-center gap-3 p-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full" />
        <div>
          <div className="font-medium text-sm">Jane Smith</div>
          <div className="text-xs text-gray-500">Engineer</div>
        </div>
        <span className="ml-auto px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs">
          Active
        </span>
      </div>
    ),
  },
  {
    title: 'Comment Thread',
    description: 'Avatar alongside commenter name, timestamp, and the comment body.',
    properties: [
      {
        css: 'align-items: flex-start',
        tailwind: 'items-start',
        explanation:
          'Aligns the avatar to the top of the comment body rather than centering it. For multi-line content like comments, top-alignment is the natural choice — centering would look odd with long text.',
      },
      {
        css: 'flex-direction: column',
        tailwind: 'flex-col',
        explanation:
          'Used on the text section (nested flex) to stack the name/timestamp row above the comment body vertically.',
      },
    ],
    code: `<div class="flex items-start gap-3 p-3">
  <div class="shrink-0 w-8 h-8 bg-gray-300
    rounded-full" />
  <div class="flex flex-col gap-1">
    <div class="flex items-center gap-2">
      <span class="font-medium text-sm">User</span>
      <span class="text-xs text-gray-400">2h ago</span>
    </div>
    <p class="text-sm text-gray-700">
      The comment text goes here...</p>
  </div>
</div>`,
    demo: (
      <div className="flex items-start gap-3 p-3">
        <div className="shrink-0 w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full" />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">Alex Johnson</span>
            <span className="text-xs text-gray-400">2h ago</span>
          </div>
          <p className="text-sm text-gray-700">
            Great explanation of the flex properties! The min-w-0 trick is something I always forget.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: 'File List Item',
    description: 'File icon, filename, size, and action buttons in a single row.',
    properties: [
      {
        css: 'align-items: center',
        tailwind: 'items-center',
        explanation:
          'Centers all items vertically: the file icon, filename + size, and action buttons.',
      },
      {
        css: 'flex: 1 1 0%',
        tailwind: 'flex-1',
        explanation:
          'Applied to the filename section so it fills the space between the icon and the actions. Combined with min-w-0 and truncate, long filenames are clipped with an ellipsis.',
      },
    ],
    code: `<div class="flex items-center gap-3 p-3
  border rounded">
  <span class="shrink-0 text-2xl">📄</span>
  <div class="min-w-0 flex-1">
    <div class="font-medium truncate text-sm">
      very-long-filename-report-2024.pdf</div>
    <div class="text-xs text-gray-500">2.4 MB</div>
  </div>
  <div class="shrink-0 flex gap-2">
    <button class="px-2 py-1 text-xs border
      rounded">Download</button>
    <button class="px-2 py-1 text-xs border
      rounded text-red-500">Delete</button>
  </div>
</div>`,
    demo: (
      <div className="flex items-center gap-3 p-3 border rounded">
        <span className="shrink-0 text-xl">&#x1F4C4;</span>
        <div className="min-w-0 flex-1">
          <div className="font-medium truncate text-sm">very-long-filename-report-2024.pdf</div>
          <div className="text-xs text-gray-500">2.4 MB</div>
        </div>
        <div className="shrink-0 flex gap-2">
          <button className="px-2 py-1 text-xs border rounded hover:bg-gray-50">Download</button>
          <button className="px-2 py-1 text-xs border rounded text-red-500 hover:bg-red-50">
            Delete
          </button>
        </div>
      </div>
    ),
  },
  {
    title: 'Product Row',
    description: 'Product image, name, price, and an add-to-cart button — e-commerce list item.',
    properties: [
      {
        css: 'align-items: center',
        tailwind: 'items-center',
        explanation:
          'Vertically centers the product image, text, price, and button on the same horizontal line.',
      },
      {
        css: 'justify-content: space-between',
        tailwind: 'justify-between',
        explanation:
          'Could be used as an alternative to flex-1 on the name section. Here we use flex-1 for the name and shrink-0 on the price/button group to achieve the same effect with better truncation support.',
      },
    ],
    code: `<div class="flex items-center gap-4 p-3
  border rounded">
  <div class="shrink-0 w-16 h-16 bg-gray-200
    rounded" />
  <div class="min-w-0 flex-1">
    <div class="font-medium truncate">
      Product Name</div>
    <div class="text-sm text-gray-500">
      Category</div>
  </div>
  <div class="shrink-0 text-right">
    <div class="font-bold">$29.99</div>
    <button class="mt-1 px-3 py-1 bg-blue-500
      text-white rounded text-sm">Add</button>
  </div>
</div>`,
    demo: (
      <div className="flex items-center gap-4 p-3 border rounded">
        <div className="shrink-0 w-14 h-14 bg-gradient-to-br from-emerald-300 to-blue-400 rounded" />
        <div className="min-w-0 flex-1">
          <div className="font-medium text-sm truncate">Wireless Bluetooth Headphones</div>
          <div className="text-xs text-gray-500">Electronics</div>
        </div>
        <div className="shrink-0 text-right">
          <div className="font-bold text-sm">$29.99</div>
          <button className="mt-1 px-3 py-1 bg-blue-500 text-white rounded text-xs">Add</button>
        </div>
      </div>
    ),
  },
  {
    title: 'Notification Item',
    description: 'Icon, notification text, timestamp, and a dismiss button.',
    properties: [
      {
        css: 'align-items: flex-start',
        tailwind: 'items-start',
        explanation:
          'Aligns the icon to the top of the notification text. Since notifications can have multi-line text, top-alignment keeps the icon next to the first line.',
      },
      {
        css: 'flex: 1 1 0%',
        tailwind: 'flex-1',
        explanation:
          'The text section fills all available space between the icon and the timestamp/dismiss button.',
      },
    ],
    code: `<div class="flex items-start gap-3 p-3
  border-l-4 border-blue-500 bg-blue-50 rounded-r">
  <span class="shrink-0 mt-0.5">ℹ️</span>
  <div class="flex-1">
    <p class="text-sm">Your report is ready to
      download.</p>
    <span class="text-xs text-gray-500">
      5 min ago</span>
  </div>
  <button class="shrink-0 text-gray-400
    hover:text-gray-600">✕</button>
</div>`,
    demo: (
      <div className="flex items-start gap-3 p-3 border-l-4 border-blue-500 bg-blue-50 rounded-r">
        <span className="shrink-0 mt-0.5">&#x2139;&#xFE0F;</span>
        <div className="flex-1">
          <p className="text-sm">Your report is ready to download.</p>
          <span className="text-xs text-gray-500">5 min ago</span>
        </div>
        <button className="shrink-0 text-gray-400 hover:text-gray-600 cursor-pointer">
          &#x2715;
        </button>
      </div>
    ),
  },
];
