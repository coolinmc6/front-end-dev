import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

const notesSections = [
  {
    title: 'CSS',
    description: 'Flexbox, Grid, Tailwind, token systems, and CSS courses.',
    link: '/docs/core-frontend/css',
  },
  {
    title: 'JavaScript',
    description: 'Language fundamentals, algorithms, regex, Zustand, and courses.',
    link: '/docs/category/javascript',
  },
  {
    title: 'TypeScript',
    description: 'Advanced types, utility types, Total TypeScript notes.',
    link: '/docs/category/typescript',
  },
  {
    title: 'React',
    description: 'Context patterns, hooks, component design, and course notes.',
    link: '/docs/category/react',
  },
  {
    title: 'Testing',
    description: 'Jest, Playwright, MSW, and Storybook.',
    link: '/docs/testing',
  },
  {
    title: 'Tools & Environments',
    description: 'Git, CI/CD, VS Code, terminal, and package managers.',
    link: '/docs/category/tools-and-environments',
  },
];

const learnPages = [
  {
    title: 'Flexbox Patterns',
    description: 'Live visual demos of common flexbox layouts with code.',
    link: '/learn/flexbox-patterns',
  },
  {
    title: 'React Context',
    description: 'Progressive examples from basic context to the factory pattern.',
    link: '/context',
  },
];

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`coolinmc6 | ${siteConfig.title}`}
      description="Colin's front-end development notes and interactive learning pages.">
      <HomepageHeader />
      <main className="container py-8">
        {/* Notes Section */}
        <section className="mb-12">
          <div className="flex items-baseline gap-4 mb-4">
            <Heading as="h2" className="!mb-0">Notes</Heading>
            <Link to="/docs/main" className="text-sm">Browse all &rarr;</Link>
          </div>
          <p className="mb-6 text-gray-600">
            Reference notes on front-end topics — things I've learned from courses, docs, and day-to-day work.
          </p>
          <div className="grid gap-4" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))'}}>
            {notesSections.map((section) => (
              <Link
                to={section.link}
                key={section.title}
                className="block p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors no-underline"
              >
                <Heading as="h3" className="!text-lg !mb-1">{section.title}</Heading>
                <p className="text-gray-600 text-sm !mb-0">{section.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Learn Section */}
        <section className="mb-12">
          <div className="flex items-baseline gap-4 mb-4">
            <Heading as="h2" className="!mb-0">Learn</Heading>
            <Link to="/learn" className="text-sm">View all &rarr;</Link>
          </div>
          <p className="mb-6 text-gray-600">
            Interactive pages with live React components — code I can actually experiment with.
          </p>
          <div className="grid gap-4" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))'}}>
            {learnPages.map((page) => (
              <Link
                to={page.link}
                key={page.title}
                className="block p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 transition-colors no-underline"
              >
                <Heading as="h3" className="!text-lg !mb-1">{page.title}</Heading>
                <p className="text-gray-600 text-sm !mb-0">{page.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
