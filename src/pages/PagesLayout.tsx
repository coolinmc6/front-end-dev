import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';

const sidebarSections = [
  {
    title: 'Learn',
    links: [
      { title: 'Learn Home', link: '/learn' },
      { title: 'Flexbox Patterns', link: '/learn/flexbox-patterns' },
    ],
  },
  {
    title: 'Context',
    links: [
      { title: 'Context Home', link: '/context' },
      { title: 'Basic Context', link: '/context/basic-context' },
      { title: 'Guarded Context', link: '/context/guarded-context' },
      { title: 'Split Context', link: '/context/split-context' },
      { title: 'Context Factory', link: '/context/context-factory' },
    ],
  },
];

type PagesLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export default function PagesLayout({ title, children }: PagesLayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Layout title={title}>
      <div className="flex min-h-[calc(100vh-60px)]">
        {/* Mobile toggle button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed bottom-4 right-4 z-50 lg:hidden w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center text-xl"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? '✕' : '☰'}
        </button>

        {/* Sidebar overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed top-[60px] left-0 h-[calc(100vh-60px)] w-64 bg-gray-50 border-r border-gray-200
            overflow-y-auto z-40 transition-transform duration-200
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0 lg:static lg:z-auto
          `}
        >
          <nav className="p-4">
            {/* To Docs link */}
            <Link
              to="/docs/main"
              className="block mb-4 px-3 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded-md"
            >
              To Docs &rarr;
            </Link>

            <hr className="mb-4 border-gray-200" />

            {sidebarSections.map((section) => (
              <div key={section.title} className="mb-4">
                <h4 className="px-3 mb-1 text-xs font-bold uppercase tracking-wider text-gray-500">
                  {section.title}
                </h4>
                <ul className="list-none pl-0">
                  {section.links.map((item) => {
                    const isActive = location.pathname === item.link || location.pathname === item.link + '/';
                    return (
                      <li key={item.link}>
                        <Link
                          to={item.link}
                          onClick={() => setSidebarOpen(false)}
                          className={`
                            block px-3 py-1.5 text-sm rounded-md no-underline
                            ${isActive
                              ? 'bg-blue-100 text-blue-700 font-semibold'
                              : 'text-gray-700 hover:bg-gray-100'
                            }
                          `}
                        >
                          {item.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 max-w-4xl">
          <h1>{title}</h1>
          {children}
        </main>
      </div>
    </Layout>
  );
}
