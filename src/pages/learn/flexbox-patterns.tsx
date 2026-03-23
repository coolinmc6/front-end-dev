import React from 'react';
import PagesLayout from '../PagesLayout';
import PatternCard from '../../components/learn/flexbox/PatternCard';
import type { FlexCategory } from '../../components/learn/flexbox/types';

import { alignmentPatterns } from '../../components/learn/flexbox/patterns/alignment';
import { directionPatterns } from '../../components/learn/flexbox/patterns/direction';
import { spacingPatterns } from '../../components/learn/flexbox/patterns/spacing';
import { wrappingPatterns } from '../../components/learn/flexbox/patterns/wrapping';
import { sizingPatterns } from '../../components/learn/flexbox/patterns/sizing';
import { navigationPatterns } from '../../components/learn/flexbox/patterns/navigation';
import { layoutPatterns } from '../../components/learn/flexbox/patterns/layouts';
import { cardPatterns } from '../../components/learn/flexbox/patterns/cards';
import { mediaListPatterns } from '../../components/learn/flexbox/patterns/media-lists';
import { formPatterns } from '../../components/learn/flexbox/patterns/forms';

const categories: FlexCategory[] = [
  { id: 'alignment', title: 'Alignment & Centering', patterns: alignmentPatterns },
  { id: 'direction', title: 'Direction & Order', patterns: directionPatterns },
  { id: 'spacing', title: 'Spacing & Distribution', patterns: spacingPatterns },
  { id: 'wrapping', title: 'Wrapping', patterns: wrappingPatterns },
  { id: 'sizing', title: 'Sizing & Growth', patterns: sizingPatterns },
  { id: 'navigation', title: 'Navigation', patterns: navigationPatterns },
  { id: 'layouts', title: 'Page Layouts', patterns: layoutPatterns },
  { id: 'cards', title: 'Cards & Content', patterns: cardPatterns },
  { id: 'media-lists', title: 'Media & Lists', patterns: mediaListPatterns },
  { id: 'forms', title: 'Forms & Inputs', patterns: formPatterns },
];

const totalPatterns = categories.reduce((sum, cat) => sum + cat.patterns.length, 0);

export default function FlexboxPatterns() {
  return (
    <PagesLayout title="Flexbox Patterns">
      <p className="text-lg mb-2">
        {totalPatterns} visual flexbox patterns with live demos, code, and detailed property descriptions.
      </p>
      <p className="text-sm text-gray-500 mb-6">
        Click "Properties Used" on any pattern to see what CSS properties and Tailwind classes make it work.
      </p>

      {/* Table of Contents */}
      <nav className="mb-8 p-4 bg-gray-50 border rounded-lg">
        <h2 className="text-sm font-bold uppercase tracking-wide text-gray-500 mb-3">
          Categories
        </h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm hover:border-blue-500 hover:text-blue-600 transition-colors no-underline"
            >
              {cat.title}
              <span className="ml-1 text-gray-400">({cat.patterns.length})</span>
            </a>
          ))}
        </div>
      </nav>

      {/* Pattern sections */}
      {categories.map((category) => (
        <section key={category.id} id={category.id} className="mb-12 scroll-mt-20">
          <div className="flex items-baseline gap-3 mb-6">
            <h2 className="text-2xl font-bold">{category.title}</h2>
            <span className="text-sm text-gray-400">
              {category.patterns.length} pattern{category.patterns.length !== 1 ? 's' : ''}
            </span>
            <a
              href="#"
              className="ml-auto text-sm text-gray-400 hover:text-blue-600 no-underline"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Back to top
            </a>
          </div>

          {category.patterns.map((pattern) => (
            <PatternCard key={pattern.title} {...pattern} />
          ))}
        </section>
      ))}
    </PagesLayout>
  );
}
