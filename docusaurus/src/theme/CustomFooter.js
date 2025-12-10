
import React from 'react';
import Link from '@docusaurus/Link';
import './CustomComponents.css'; // Make sure this path is correct

const CustomFooter = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-main">
        <div className="footer-top-section">
          <div className="footer-logo-area">
            <img src="https://cdn-icons-png.flaticon.com/512/15199/15199109.png" alt="Logo" className="footer-logo-img" />
            <p className="footer-title">Physical and Humanoid Robotics</p>
          </div>
          <div className="footer-links-container">
            <div className="footer-column">
              <h4>Documentation</h4>
              <Link to="/docs/intro/intro-physical-ai">Introduction</Link>
              <Link to="/docs/fundamentals/sensors-and-actuators">Fundamentals</Link>
              <Link to="/docs/advanced/humanoid-locomotion">Advanced Topics</Link>
            </div>
            <div className="footer-column">
              <h4>Community</h4>
              <a href="#" target="_blank" rel="noopener noreferrer">Discord</a>
              <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
            </div>
            <div className="footer-column">
              <h4>More</h4>
              <a href="https://github.com/HuzaifaKhan32/GIAIC_Spec_Driven_Hackathon.git" target="_blank" rel="noopener noreferrer">GitHub</a>
              <Link to="#">Blog</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Copyright © {new Date().getFullYear()} Physical and Humanoid Robotics. Built with Docusaurus.</p>
        </div>
      </div>
    </footer>
  );
};

export default CustomFooter;
