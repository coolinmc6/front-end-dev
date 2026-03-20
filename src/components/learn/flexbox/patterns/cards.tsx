import React from 'react';
import type { FlexPattern } from '../types';

export const cardPatterns: FlexPattern[] = [
  {
    title: 'Card with Bottom Action',
    description: 'A card where the action button always sits at the bottom, regardless of content height.',
    properties: [
      {
        css: 'flex-direction: column',
        tailwind: 'flex-col',
        explanation:
          'Stacks card content vertically: body on top, button at the bottom.',
      },
      {
        css: 'flex: 1 1 0%',
        tailwind: 'flex-1',
        explanation:
          'Applied to the card body so it grows to fill all available space, pushing the button to the bottom. When multiple cards of different content heights sit in a row, this ensures all buttons align at the same vertical position.',
      },
      {
        css: 'margin-top: auto',
        tailwind: 'mt-auto',
        explanation:
          'An alternative to flex-1 on the body: put mt-auto on the button itself. In a flex column, mt-auto absorbs all remaining space above the button, pushing it to the bottom. Both approaches work; mt-auto is more explicit about intent.',
      },
    ],
    code: `<div class="flex flex-col h-64 p-4 border rounded">
  <h3 class="font-bold mb-2">Card Title</h3>
  <p class="flex-1">Card content of varying length
    goes here.</p>
  <button class="mt-4 px-4 py-2 bg-blue-500
    text-white rounded">Action</button>
</div>`,
    demo: (
      <div className="flex flex-col h-48 p-4 border rounded">
        <h3 className="font-bold mb-2 text-sm">Card Title</h3>
        <p className="flex-1 text-sm text-gray-600">Card content of varying length goes here.</p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded text-sm">Action</button>
      </div>
    ),
  },
  {
    title: 'Horizontal Card',
    description: 'Image on the left, text content on the right — a common card variation.',
    properties: [
      {
        css: 'flex-shrink: 0',
        tailwind: 'shrink-0',
        explanation:
          'Applied to the image container so it maintains its width. Without shrink-0, the image would compress when the text is long.',
      },
      {
        css: 'min-width: 0',
        tailwind: 'min-w-0',
        explanation:
          'Applied to the text container so it can shrink below its content width, enabling text truncation. By default, flex items have min-width: auto which prevents this.',
      },
    ],
    code: `<div class="flex border rounded overflow-hidden">
  <div class="shrink-0 w-32 h-32 bg-gray-300" />
  <div class="min-w-0 p-4">
    <h3 class="font-bold">Title</h3>
    <p class="text-sm text-gray-600 truncate">
      Long description text here...</p>
  </div>
</div>`,
    demo: (
      <div className="flex border rounded overflow-hidden">
        <div className="shrink-0 w-28 h-28 bg-gradient-to-br from-blue-400 to-purple-500" />
        <div className="min-w-0 p-3">
          <h3 className="font-bold text-sm">Article Title</h3>
          <p className="text-xs text-gray-600 mt-1">
            A brief description of this article that might be quite long...
          </p>
        </div>
      </div>
    ),
  },
  {
    title: 'Card Row',
    description: 'Multiple equal-width cards displayed in a horizontal row.',
    properties: [
      {
        css: 'flex: 1 1 0%',
        tailwind: 'flex-1',
        explanation:
          'Applied to each card so they all take equal width. Each card is itself a flex-col container with a bottom-aligned button, combining two patterns.',
      },
      {
        css: 'gap',
        tailwind: 'gap-4',
        explanation:
          'Adds consistent spacing between cards. Using gap is cleaner than margin because it doesn\'t add space at the outer edges.',
      },
    ],
    code: `<div class="flex gap-4">
  <div class="flex-1 flex flex-col p-4
    border rounded">
    <h3 class="font-bold">Card 1</h3>
    <p class="flex-1 text-sm">Short text</p>
    <button class="mt-3 bg-blue-500 text-white
      rounded py-2">Go</button>
  </div>
  <div class="flex-1 flex flex-col p-4
    border rounded">
    <h3 class="font-bold">Card 2</h3>
    <p class="flex-1 text-sm">Longer text pushes
      other cards</p>
    <button class="mt-3 bg-blue-500 text-white
      rounded py-2">Go</button>
  </div>
</div>`,
    demo: (
      <div className="flex gap-4">
        {['Short text', 'Longer description text that takes up more room', 'Medium text here'].map(
          (text, i) => (
            <div key={i} className="flex-1 flex flex-col p-3 border rounded">
              <h3 className="font-bold text-sm">Card {i + 1}</h3>
              <p className="flex-1 text-xs text-gray-600 mt-1">{text}</p>
              <button className="mt-3 bg-blue-500 text-white rounded py-1 text-sm">Go</button>
            </div>
          )
        )}
      </div>
    ),
  },
  {
    title: 'Pricing Card',
    description: 'A tall card with price, feature list, and CTA button pinned at the bottom.',
    properties: [
      {
        css: 'flex-direction: column',
        tailwind: 'flex-col',
        explanation:
          'Stacks pricing card elements vertically: plan name, price, features, then the CTA button.',
      },
      {
        css: 'align-items: center',
        tailwind: 'items-center',
        explanation:
          'Centers all content horizontally within the card. Pricing cards typically center their text and CTA.',
      },
      {
        css: 'margin-top: auto',
        tailwind: 'mt-auto',
        explanation:
          'Pushes the CTA button to the bottom of the card. When pricing cards of different feature counts sit side-by-side, mt-auto ensures all buttons align at the same vertical position.',
      },
    ],
    code: `<div class="flex flex-col items-center p-6
  border rounded h-72">
  <h3 class="text-xl font-bold">Pro</h3>
  <div class="text-3xl font-bold my-3">$29/mo</div>
  <ul class="text-sm text-gray-600 space-y-2">
    <li>10 Projects</li>
    <li>Priority Support</li>
    <li>API Access</li>
  </ul>
  <button class="mt-auto w-full py-2 bg-blue-500
    text-white rounded">Choose Plan</button>
</div>`,
    demo: (
      <div className="flex flex-col items-center p-4 border rounded h-56">
        <h3 className="text-lg font-bold">Pro</h3>
        <div className="text-2xl font-bold my-2">$29/mo</div>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>10 Projects</li>
          <li>Priority Support</li>
          <li>API Access</li>
        </ul>
        <button className="mt-auto w-full py-2 bg-blue-500 text-white rounded text-sm">
          Choose Plan
        </button>
      </div>
    ),
  },
  {
    title: 'Testimonial Card',
    description: 'Avatar, quote, and attribution arranged in a centered vertical layout.',
    properties: [
      {
        css: 'flex-direction: column',
        tailwind: 'flex-col',
        explanation:
          'Stacks the avatar, quote text, and attribution name vertically.',
      },
      {
        css: 'align-items: center',
        tailwind: 'items-center',
        explanation:
          'Centers all elements horizontally — the avatar, the quoted text, and the name are all centered for a clean testimonial look.',
      },
    ],
    code: `<div class="flex flex-col items-center p-6
  border rounded gap-4">
  <div class="w-16 h-16 bg-gray-300
    rounded-full" />
  <p class="text-center text-gray-600 italic">
    "This product changed the way I work."
  </p>
  <div class="font-semibold">— Jane Smith</div>
</div>`,
    demo: (
      <div className="flex flex-col items-center p-4 border rounded gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full" />
        <p className="text-center text-gray-600 italic text-sm">
          "This product changed the way I work."
        </p>
        <div className="font-semibold text-sm">— Jane Smith</div>
      </div>
    ),
  },
  {
    title: 'Feature Block',
    description: 'Icon alongside a heading and description — common in feature sections.',
    properties: [
      {
        css: 'gap',
        tailwind: 'gap-4',
        explanation:
          'Creates space between the icon and the text block without needing margin. The icon is fixed-width (shrink-0) and the text fills the remaining space.',
      },
      {
        css: 'align-items: flex-start',
        tailwind: 'items-start',
        explanation:
          'Aligns the icon to the top of the text block rather than centering it. For multi-line descriptions, top-alignment looks cleaner than center-alignment.',
      },
    ],
    code: `<div class="flex items-start gap-4">
  <div class="shrink-0 w-12 h-12 bg-blue-500
    rounded-lg flex items-center justify-center
    text-white text-xl">⚡</div>
  <div>
    <h3 class="font-bold">Fast Performance</h3>
    <p class="text-sm text-gray-600">
      Our optimized engine delivers results in
      milliseconds, not seconds.
    </p>
  </div>
</div>`,
    demo: (
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
          &#x26A1;
        </div>
        <div>
          <h3 className="font-bold text-sm">Fast Performance</h3>
          <p className="text-xs text-gray-600 mt-1">
            Our optimized engine delivers results in milliseconds, not seconds.
          </p>
        </div>
      </div>
    ),
  },
];
