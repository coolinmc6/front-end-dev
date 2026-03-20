import PagesLayout from '../PagesLayout';
import Link from '@docusaurus/Link';

const learnPages = [
  {
    title: 'Flexbox Patterns',
    description: 'A visual list of common flexbox patterns with live demos and code.',
    link: '/learn/flexbox-patterns',
  },
];

export default function LearnHome() {
  return (
    <PagesLayout title="Learn">
      <p className="text-lg mb-6">
        Interactive pages for learning frontend concepts hands-on.
      </p>

      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {learnPages.map((page) => (
          <Link
            to={page.link}
            key={page.title}
            className="block p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 transition-colors no-underline"
          >
            <h3 className="text-xl font-semibold mb-2">{page.title}</h3>
            <p className="text-gray-600">{page.description}</p>
          </Link>
        ))}
      </div>
    </PagesLayout>
  );
}
