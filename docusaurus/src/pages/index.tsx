import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ChatbotWidget from '../components/ChatbotWidget/ChatbotWidget'; // Import the ChatbotWidget
import '../css/homepage.css';
import '../css/responsive.css';

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const backendUrl = "https://giaicspecdrivenhackathon-production.up.railway.app/api/chat/query";

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
                {
                  title: 'Ch. 1: Intro to Physical AI',
                  link: '/docs/intro/intro-physical-ai',
                  img: 'https://frankdiana.net/wp-content/uploads/2024/02/humanoid-robot-and-ai.png',     
                },
                {
                  title: 'Ch. 2: Sensors and Actuators',
                  link: '/docs/fundamentals/sensors-and-actuators',
                  img: 'https://tse3.mm.bing.net/th/id/OIP.K23vKSOckjEG3dlgfv5LyAHaLG?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
                },
                {
                  title: 'Ch. 3: Kinematics and Dynamics',
                  link: '/docs/fundamentals/kinematics-and-dynamics',
                  img: 'https://tse1.mm.bing.net/th/id/OIP.0xZXJU9mUB7XlJzqmg7x9QHaEO?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
                },
                {
                  title: 'Ch. 4: Computer Vision',
                  link: '/docs/applications/computer-vision',
                  img: 'https://tse3.mm.bing.net/th/id/OIP.WHPLWf29bGuoYMTW-ykmSQHaEK?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
                },
                {
                  title: 'Ch. 5: RL Basics',
                  link: '/docs/applications/rl-basics',
                  img: 'https://amostofi.com/wp-content/uploads/2024/01/what-is-rl-machine-learning-min.jpg',
                },
                {
                  title: 'Ch. 6: Sim2Real',
                  link: '/docs/applications/sim-to-real',
                  img: 'https://mikekalil.com/wp-content/uploads/2025/05/sim2real-gap-illustration.png',  
                },
                {
                  title: 'Ch. 7: Humanoid Locomotion',
                  link: '/docs/advanced/humanoid-locomotion',
                  img: 'https://roboticsbiz.com/wp-content/uploads/2025/05/humanoid-739x420.jpg',
                },
                {
                  title: 'Ch. 8: Manipulation and Grasping',
                  link: '/docs/advanced/manipulation-and-grasping',
                  img: 'https://tse1.mm.bing.net/th/id/OIP.thtwtx32TzQqx3LsjaHAnAHaFV?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
                },
                {
                  title: 'Ch. 9: Human-Robot Interaction',
                  link: '/docs/advanced/human-robot-interaction',
                  img: 'https://static.vecteezy.com/system/resources/thumbnails/023/435/685/original/a-humanoid-robot-has-been-created-utilizing-counterfeit-insights-to-take-after-a-human-being-creative-resource-animation-free-video.jpg',
                },
                {
                  title: 'Ch. 10: Future of Humanoids',
                  link: '/docs/resources/future-of-humanoids',
                  img: 'https://tse3.mm.bing.net/th/id/OIP.S_-aPX0rfCcFZkntdLxL4AEsEs?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
                },
              ].map((chapter, idx) => (
                <a href={chapter.link} key={idx} className="chapter-card" style={{backgroundImage: `url("${chapter.img}")`}}>
                  <p className="chapter-title">{chapter.title}</p>
                </a>
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
        <ChatbotWidget backendUrl={backendUrl} /> {/* Render ChatbotWidget at the end of main */}
      </main>
    </Layout>
  );
}