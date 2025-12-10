import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import { useColorMode } from '@docusaurus/theme-common';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import './CustomComponents.css';

const CustomNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { colorMode, setColorMode } = useColorMode();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    setColorMode(colorMode === 'dark' ? 'light' : 'dark');
  };

  // Combine Docusaurus classes with custom ones
  const navBarClassName = [
    "navbar",
    "navbar--fixed-top",
    "navbar-container"
  ].join(" ");

  return (
    <header className={navBarClassName}>
      <div className="navbar-content">
        <Link to="/" className="navbar-logo">
          <img src="https://cdn-icons-png.flaticon.com/512/15199/15199109.png" alt="Logo" className="logo-img" />
          <h1 className="navbar-title">Physical AI and Humanoid Robotics</h1>
        </Link>

        <div className="navbar-actions">
          {/* Desktop Links */}
          <nav className="navbar-links-desktop">
            <Link to="/docs/preface/" className="navbar-link">Chapters</Link>
            <Link to="https://github.com/HuzaifaKhan32/GIAIC_Spec_Driven_Hackathon.git" className="navbar-link">GitHub</Link>
          </nav>

          {/* Desktop Buttons */}
          <div className="navbar-buttons-desktop">
            <button onClick={toggleTheme} className="theme-toggle-button" aria-label="Toggle theme">
                {isClient && (colorMode === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />)}
            </button>
            <button className="navbar-login-button glow-button">Login</button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="navbar-mobile-toggle">
            <button onClick={toggleMenu} aria-label="Toggle menu" className="mobile-toggle-button">
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Box */}
      {isClient && isOpen && (
        <div className="mobile-menu-container slide-in">
          <div className="mobile-menu-box glassmorphism gradient-border">
            <nav className="mobile-menu-links">
              <Link to="/docs/preface/" className="navbar-link" onClick={toggleMenu}>Chapters</Link>
              <Link to="https://github.com/HuzaifaKhan32/GIAIC_Spec_Driven_Hackathon.git" className="navbar-link" onClick={toggleMenu}>GitHub</Link>
              <hr className="mobile-menu-divider" />
              <div className="mobile-menu-buttons">
                <button onClick={toggleTheme} className="theme-toggle-button" aria-label="Toggle theme">
                    {colorMode === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
                    <span>Toggle Theme</span>
                </button>
                <button className="navbar-login-button glow-button">Login</button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default CustomNavbar;