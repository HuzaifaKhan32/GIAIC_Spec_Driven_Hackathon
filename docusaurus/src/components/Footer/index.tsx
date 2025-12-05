import React from 'react';
import clsx from 'clsx';
import styles from './Footer.module.css';

export default function Footer(): JSX.Element {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <h3 className={styles.title}>Physical AI</h3>
            <p className={styles.text}>
              Build the future, one algorithm at a time. The definitive guide to intelligent machines.
            </p>
          </div>
          <div className={styles.column}>
            <h4 className={styles.subtitle}>Content</h4>
            <ul className={styles.list}>
              <li><a href="/docs" className={styles.link}>Chapters</a></li>
              <li><a href="#features" className={styles.link}>Features</a></li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4 className={styles.subtitle}>Community</h4>
            <ul className={styles.list}>
              <li><a href="https://github.com/huzaifa-nadeem/physical-ai-textbook" className={styles.link}>GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.copyright}>
          Copyright © {new Date().getFullYear()} Physical AI & Humanoid Robotics. Built with Docusaurus.
        </div>
      </div>
    </footer>
  );
}
