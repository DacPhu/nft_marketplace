import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/tutorial.module.css';

const nfttutorial = () => {
  return (
    <>
      <Head>
        <title>NFT Marketplace Tutorial</title>
      </Head>
      <div className={styles.tutorialLayout}>
        <aside className={styles.sidebar}>
          <h2>Table of Contents</h2>
          <ul>
            <li><Link href="#getting-started"><a>Getting Started</a></Link></li>
            <li><Link href="#buying-nfts"><a>Buying NFTs</a></Link></li>
            <li><Link href="#selling-nfts"><a>Selling NFTs</a></Link></li>
            {/* Add more links as needed */}
          </ul>
        </aside>
        <main className={styles.content}>
          <section id="getting-started">
            <h2>Getting Started</h2>
            <p>This section will cover how to create an account and start using the marketplace.</p>
            {/* More content */}
          </section>

          <section id="buying-nfts">
            <h2>Buying NFTs</h2>
            <p>Learn how to browse and buy NFTs on our platform.</p>
            {/* Additional content */}
          </section>

          <section id="selling-nfts">
            <h2>Selling NFTs</h2>
            <p>Here's how you can list your NFTs for sale and what to expect.</p>
            {/* Additional content */}
          </section>

          {/* More sections as needed */}
        </main>
      </div>
    </>
  );
};

export default nfttutorial;