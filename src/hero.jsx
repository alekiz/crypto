import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <header className="hero-container">
      {/* Top Navigation */}
      {/* Main Hero Content */}
      <div className="hero-content">
        <small className="hero-subtitle">CRYPTO MINING MADE EASY</small>
        <h1 className="hero-title">
          START <span>MINING</span> YOUR OWN CRYPTO
        </h1>
        <p className="hero-description">
          Take control of your mining destiny. Access advanced hardware, 
          top-tier pool strategies, and maximize your rewards. 
          Join the digital revolution today!
        </p>
        <div className="hero-btn-group">
          <button className="btn hero-btn-primary">
            <Link to="/dashboard">Start Mining</Link>
          </button>
          <button className="btn hero-btn-outline">How It Works?</button>
        </div>
      </div>
      {/* Right-Side Hero Graphic */}
      <div className="hero-graphic">
        <img
          src="https://assets.toptal.io/images?url=https%3A%2F%2Fbs-uploads.toptal.io%2Fblackfish-uploads%2Fcomponents%2Fblog_post_page%2F4087184%2Fcover_image%2Fregular_1708x683%2FUntitled-c7f4c86ddb44556b00a31a37e4219c3d.png"
          alt="Hero Graphic"
          className="hero-image"
        />
        <div className="hero-ring" />
      </div>
    </header>
  );
};

export default Hero;
