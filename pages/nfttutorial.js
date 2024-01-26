import React, { useState } from 'react';
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
            <li><Link href="#create-nfts"><a>Create NFTs</a></Link></li>
            <li><Link href="#selling-nfts"><a>Selling NFTs</a></Link></li>
            {/* Add more links as needed */}
          </ul>
        </aside>
        <main className={styles.content}>
          <section id="getting-started">
            <h2>Getting Started</h2>
            <p>First, you access the website, and then you must link it to your wallet using
              MetaMask and log in through MetaMask.</p>
            {/* More content */}
          </section>

          <section id="buying-nfts">
            <h2>Buying NFTs</h2>
            <p>To purchase a product, you need to click on the product and check the product information, then click
              on the 'Buy NFT' button and make the payment through MetaMask to complete the purchase of a product.</p>
            {/* Additional content */}
          </section>

          <section id="create-nfts">
            <h2>Create NFTs</h2>
            <p>To create an NFT, click on the 'Create' button, upload the file containing the NFT,
              and fill in the information of that product, then click the 'Upload' button to create the NFT.</p>
            {/* Additional content */}
          </section>

          <section id="selling-nfts">
            <h2>Selling NFTs</h2>
            <p>To sell the NFT you have created, you need to go to your collection and select the product
              you want to sell, then post it for auction or list it in the marketplace.</p>
            {/* Additional content */}
          </section>
        </main>
      </div>
    </>
  );
};

export default nfttutorial;