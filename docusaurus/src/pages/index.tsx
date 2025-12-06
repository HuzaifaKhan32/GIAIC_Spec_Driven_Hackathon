import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ChatbotWidget from '../components/ChatbotWidget/ChatbotWidget'; // Import the ChatbotWidget
import '../css/homepage.css';
import '../css/responsive.css';

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Physical AI & Humanoid Robotics Textbook"
    >
      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container">
            <h1 className="hero-title">Physical AI & Humanoid Robotics</h1>
            <p className="hero-subtitle">
              Build the future, one algorithm at a time. This guide is your key to unlocking the world of intelligent machines and autonomous systems.
            </p>
            <a href="/docs/intro/intro-physical-ai" className="hero-button">
              Explore the Future
            </a>
            <div 
              className="hero-image" 
              style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDpM4aQkC-pJakvWoUyJ6A6os7Ot6mMlofDYrpCDt7qk5THgnn8kdBejUvhjxmpPdtN6Z4mHf9P_eamwx-8WtLGdgPWh8ws5-pxr4ozChPmA2-QH__sOH_q-mZxOmyjStrfygLBz0I3HyuTxYEb9zFeAzvGKLlxGLaetlsD-1UuYoi-hmJtJVEqyyofz3ydr-p5lW0EAEMWgwpxQ3QHZeEDXLodiCsLjvWVZwHinhR-eDd5v3L54SFEZyUDvL0Dnp3_EWRe5zuRb1uc")'}}
              role="img"
              aria-label="3D isometric robot illustration"
            ></div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="features-section">
          <div className="container">
            <h2 className="section-title">What You'll Master</h2>
            <p className="section-description">
              Dive deep into the core concepts of artificial intelligence and robotics with hands-on examples and cutting-edge theory.
            </p>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3 className="feature-title">Neural Networks</h3>
                <p className="feature-desc">Understand and build complex neural networks from scratch.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">👁️</div>
                <h3 className="feature-title">Machine Vision</h3>
                <p className="feature-desc">Teach machines to see and interpret the world around them.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🤖</div>
                <h3 className="feature-title">Autonomous Systems</h3>
                <p className="feature-desc">Design robots that can navigate and operate independently.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Chapters Grid */}
        <section className="chapters-section">
          <div className="container">
            <h2 className="section-title">A Glimpse Inside</h2>
            <div className="chapters-grid">
              {[
                { title: 'Ch. 1: Foundations of AI', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9jqRPX1c0PxhRHDkSahiPpI6gE9J4bYhbmZsGmP9PI9QExQE1Pk57bZrgsL59trQWqT9pPT4m7HWmPrDPGcAkZxxp6iJkC0UR_CYJkrVjT5a2b6TUFETFrcqL6LlUryJDL4VmSbnkgPE3xHZU1mW2S-STaAnWYNb3z94BSVcLCosxMqFwIWkRBZt8VZzBwtuk3QPtFU5MqcOQr0b6tYk3Assyp9QIJgVP1NPDrf8KwYMAOm8i_Dq9WFQW7vZ5iXQ9HZTvh0GXgWhS' },
                { title: 'Ch. 2: Python for Robotics', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvVkGDbZIbWl8HeIAQRs-YWpWKeG6yu9QFK820SfUUvU2h2qywnx1iTCDaBqw2KeHfY2O47MirPSWcXk_sEYWNVsUvQVeDWyixG4drYTfaCHKY_7YginOUwKXWw-twIZetsZ7wChSkTVgbfccqPNOmsYQ2e1osNBmr6Z4uqBmdRjuZ956CbLL-CXKQZcGivCUk1WBtaiV4eHeQkjDPr1WxuvHytr2aY-VwUd1chOew3uZekqve4wp6hA7VDL9ZX3wlj-djHru3dSGe' },
                { title: 'Ch. 3: ML Principles', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1knWRHZPJaw93UCwWpMCDvWe_ZEcE-d6ee9q5X0KLh-xHdPP93gx1KApbAWJ6Y0iqqLzcWAryoLWCMWiF7-HDIEXw2oqPGw_20jLubC3kfNvGD8qsaO6h8Aysg_rF9AR7kJ5LkPqzRiqPAHHTqYcG5UWXz6GyedOXWUqEsIrYI3F6KoUWxY283rGbOGFL9lW5L8HFBWzKW6cD4ht5AwQX9-8tLL37RyYiqiQDpzr0AhkeNfvgUBLWi_y7aUgNQRBcz9LF2zb486YX' },
                { title: 'Ch. 4: Deep Learning', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2zQvK5dGw0ejU3pWV0vvx8ABHs6xBnYj8li6L6Ep5dGPfBLOOPVdAiQk_FObbTDmvCiOS18TbF4cvFBFI2Z02x5BTjEG7Z-Y3XKQvbwazreEcZVyAJHRoBiUPRLd6w4dkEjeFEM0Se9tiFbpddaGn7cAAdqQfIv-DVDkpjTGKi_NcHWfk-ck7GJtsChcJgrSwAc1fO3Q_-hrDO5Pp82gt4dTeqyHLqwoMc92niTKVaz-Xbn9YCVx3MzIkBmHvHEBffG5DfoPZ5eT' },
              ].map((chapter, idx) => (
                <div key={idx} className="chapter-card" style={{backgroundImage: `url("${chapter.img}")`}}>
                  <p className="chapter-title">{chapter.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-container">
            <h2 className="cta-title">Ready to Build the Future?</h2>
            <p className="cta-subtitle">
              Join thousands of readers and start your journey into the fascinating world of AI and Robotics today.
            </p>
            <div className="cta-stats">
              <div className="cta-stat">
                <p className="cta-stat-number">10,000+</p>
                <p className="cta-stat-label">Readers</p>
              </div>
              <div className="cta-stat">
                <p className="cta-stat-number">5,000+</p>
                <p className="cta-stat-label">Snippets</p>
              </div>
            </div>
            <button className="cta-button">Start Learning Now</button>
          </div>
        </section>
        <ChatbotWidget /> {/* Render ChatbotWidget at the end of main */}
      </main>
    </Layout>
  );
}