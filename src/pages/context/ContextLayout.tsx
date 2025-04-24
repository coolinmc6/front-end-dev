import React from 'react';
import CustomLayout from '../CustomLayout';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';

// List of all context example pages
const contextLinks = [
  { title: 'Basic Context', level: 1, link: '/context/basic-context', inProgress: false },
  { title: 'Guarded Context', level: 2, link: '/context/guarded-context', inProgress: false },
  { title: 'Split Context', level: 3, link: '/context/split-context', inProgress: false },
  { title: 'Context Factory', level: 5, link: '/context/context-factory', inProgress: true },
];

type ContextLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export default function ContextLayout({ title, children }: ContextLayoutProps) {
  const location = useLocation();

  
  return (
    <CustomLayout>
      <div className="m-3 max-w-[600px]">
        <div className="mb-5">
          <h3 className="text-lg font-semibold">Docs Reference</h3>
          <Link to="/context" className="text-blue-600 hover:underline">Context Home</Link>
        </div>

        <div className="mb-5">
           <h3>Other Context</h3>
           <div className="flex gap-2">
            {contextLinks.map((item) => (
              <Link to={item.link} key={item.title} className="mb-2 flex-grow-1 flex-shrink-0 p-1 border border-gray-300 rounded-md">
                <strong>#{item.level}:</strong>
                &nbsp;
                {item.title}{item.inProgress && <span className="ml-2">(In Progress)</span>}
              </Link>
            ))}
           </div>
        </div>
        
        <h1>{title}</h1>
        <div className="p-2 border-2 border-gray-300 rounded-md mb-5">
          {children}
        </div>
      </div>
    </CustomLayout>
  );
}