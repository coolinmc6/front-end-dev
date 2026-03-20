import React, { useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import type { FlexPattern } from './types';

export default function PatternCard({ title, description, properties, code, demo }: FlexPattern) {
  const [showProps, setShowProps] = useState(false);

  return (
    <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-5">
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>

        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          {/* Live demo */}
          <div className="flex-1 border-2 border-dashed border-gray-300 rounded p-4 bg-gray-50 min-h-[120px]">
            {demo}
          </div>
          {/* Code */}
          <div className="flex-1">
            <CodeBlock language="html">{code}</CodeBlock>
          </div>
        </div>

        {/* Properties toggle */}
        <button
          onClick={() => setShowProps(!showProps)}
          className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 cursor-pointer bg-transparent border-none p-0"
        >
          <span>{showProps ? '\u25BC' : '\u25B6'}</span>
          Properties Used ({properties.length})
        </button>
      </div>

      {/* Expandable properties section */}
      {showProps && (
        <div className="border-t border-gray-200 bg-gray-50 p-5">
          <div className="flex flex-col gap-4">
            {properties.map((prop) => (
              <div key={prop.css + prop.tailwind} className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <code className="text-sm bg-gray-200 px-2 py-0.5 rounded font-mono">
                    {prop.css}
                  </code>
                  <span className="text-gray-400">&rarr;</span>
                  <code className="text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-mono">
                    {prop.tailwind}
                  </code>
                </div>
                <p className="text-sm text-gray-700 ml-0 mt-1 leading-relaxed">
                  {prop.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
