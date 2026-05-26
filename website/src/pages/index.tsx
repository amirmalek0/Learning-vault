import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <h1 className={styles.heroTitle}>
          A personal vault for{' '}
          <span className={styles.heroTitleGradient}>engineering knowledge</span>
        </h1>

        <p className={styles.heroSubtitle}>
          Curated notes on DevOps, software engineering, and Linux internals.
        </p>

        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/category/devops">
            Explore DevOps →
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/category/software-engineering">
            Software Engineering
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHeader />
    </Layout>
  );
}
