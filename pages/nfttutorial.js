import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/tutorial.module.css';
import ErrorPopup from "../components/ErrorPopup/ErrorPopup";

const nfttutorial = () => {
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const testErrorPopup = () => {
    setErrorMessage('This is a test error message!');
    setShowErrorPopup(true);
  };

  const closeErrorPopup = () => {
    setShowErrorPopup(false);
  };
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
            <li><Link href="#create-nfts"><a>Create NFTs</a></Link></li>
            <li><Link href="#selling-nfts"><a>Selling NFTs</a></Link></li>
            <li><a href="#" onClick={testErrorPopup}>Test Error Popup</a></li> {/* Test link for error popup */}

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

          <section id="create-nfts">
            <h2>Create NFTs</h2>
            <p>Learn how to create NFTs on our platform.</p>
            {/* Additional content */}
          </section>

          <section id="selling-nfts">
            <h2>Selling NFTs</h2>
            <p>Learn how to sell your NFTs on our platform.</p>
            {/* Additional content */}
          </section>

          {/* More sections as needed */}
        </main>
      </div>
      {showErrorPopup && <ErrorPopup message={errorMessage} onClose={closeErrorPopup} />}
    </>
  );
};

export default nfttutorial;