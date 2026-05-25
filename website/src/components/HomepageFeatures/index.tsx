import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
  to: string;
  linkLabel: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'DevOps',
    icon: '⚙️',
    description:
      'Docker, Linux internals, Kubernetes and the infrastructure tools that keep modern systems running smoothly.',
    to: '/category/devops',
    linkLabel: 'Browse DevOps notes',
  },
  {
    title: 'Software Engineering',
    icon: '💻',
    description:
      'Languages, design patterns, architecture and the fundamentals of writing software that lasts.',
    to: '/category/software-engineering',
    linkLabel: 'Browse engineering notes',
  },
  {
    title: 'Linux & Systems',
    icon: '🐧',
    description:
      'Deep dives into the kernel, namespaces, containers and how the OS actually works under the hood.',
    to: '/category/linux',
    linkLabel: 'Explore Linux notes',
  },
  {
    title: 'Open & Editable',
    icon: '📖',
    description:
      'Every note lives on GitHub as plain Markdown. Click “Edit this page” on any article to suggest a change.',
    to: 'https://github.com/amirmalek0/Learning-vault',
    linkLabel: 'View on GitHub',
  },
  {
    title: 'Built for Reading',
    icon: '✨',
    description:
      'Clean typography, dark mode, fast search and keyboard shortcuts — designed to actually be read.',
    to: '/category/devops',
    linkLabel: 'Start reading',
  },
  {
    title: 'Always Evolving',
    icon: '🚀',
    description:
      'Notes are updated as I learn. Treat this as a living document, not a finished book.',
    to: '/category/devops',
    linkLabel: "What's new",
  },
];

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function Feature({title, icon, description, to, linkLabel}: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.cardCol)}>
      <div className={styles.card}>
        <div className={styles.cardIcon} aria-hidden="true">{icon}</div>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{description}</p>
        <Link className={styles.cardLink} to={to}>
          {linkLabel} <Arrow />
        </Link>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionEyebrow}>What you'll find</span>
          <h2 className={styles.sectionTitle}>
            Notes that grow with experience
          </h2>
          <p className={styles.sectionSubtitle}>
            A focused collection of practical knowledge across the stack —
            organized so future-you can find it again.
          </p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
