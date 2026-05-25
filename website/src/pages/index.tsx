import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          <span>Continuously updated — always learning</span>
        </div>

        <h1 className={styles.heroTitle}>
          A personal vault for{' '}
          <span className={styles.heroTitleGradient}>engineering knowledge</span>
        </h1>

        <p className={styles.heroSubtitle}>
          Curated notes on DevOps, software engineering, Linux internals and the
          tools that power modern systems — written to be read again.
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

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>2</div>
            <div className={styles.statLabel}>Categories</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>∞</div>
            <div className={styles.statLabel}>Growing daily</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>100%</div>
            <div className={styles.statLabel}>Open source</div>
          </div>
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
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
