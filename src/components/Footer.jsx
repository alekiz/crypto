import React from "react";
import styled from "styled-components";

// Footer Container
const FooterContainer = styled.footer`
  background-color: #000;
  color: #fff;
  padding: 2rem;
  font-family: 'Roboto', sans-serif;
  font-size: 0.9rem;
`;

// Top Section (Sign-up form)
const FooterTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto 2rem auto;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const FooterLeft = styled.div`
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    margin-bottom: 0;
    max-width: 50%;
  }
`;

const FooterTitle = styled.h2`
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  font-weight: 600;
`;

const FooterSubtitle = styled.p`
  margin: 0;
  line-height: 1.4;
  max-width: 400px;
`;

const FooterForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: 576px) {
    flex-direction: row;
    align-items: center;
  }
`;

const FooterInput = styled.input`
  padding: 0.5rem;
  margin-bottom: 0.75rem;
  border: 1px solid #444;
  background: #222;
  color: #fff;
  outline: none;
  border-radius: 4px;
  width: 100%;

  ::placeholder {
    color: #aaa;
  }

  &:focus {
    border-color: #666;
  }

  @media (min-width: 576px) {
    margin-bottom: 0;
    margin-right: 0.5rem;
    width: auto;
    min-width: 220px;
  }
`;

const FooterButton = styled.button`
  padding: 0.5rem 1rem;
  background: #fff;
  color: #000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background: #f2f2f2;
  }
`;

const DisclaimerText = styled.p`
  margin-top: 1rem;
  font-size: 0.8rem;
  line-height: 1.4;
  max-width: 600px;
  color: #ccc;
`;

// Middle Section (Links)
const FooterMiddle = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto 2rem auto;
  gap: 2rem;
  justify-content: space-between;
`;

const FooterColumn = styled.div`
  min-width: 150px;
  flex: 1;

  @media (max-width: 576px) {
    flex: 1 1 100%;
  }
`;

const ColumnTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
`;

const FooterLink = styled.a`
  display: block;
  color: #ccc;
  text-decoration: none;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;

  &:hover {
    color: #fff;
    text-decoration: underline;
  }
`;

// Bottom Section (Legal links & copyright)
const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  border-top: 1px solid #333;
  padding-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
`;

const FooterLegalLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FooterLegalLink = styled.a`
  color: #ccc;
  text-decoration: none;
  font-size: 0.8rem;

  &:hover {
    color: #fff;
    text-decoration: underline;
  }
`;

const FooterCopyright = styled.div`
  font-size: 0.8rem;
  color: #aaa;
`;

// Actual Footer Component
const Footer = () => {
  return (
    <FooterContainer>
      {/* Top: "Don't Miss Out" + Sign-up */}
      <FooterTop>
        <FooterLeft>
          <FooterTitle>Don't Miss Out on Mining Rewards</FooterTitle>
          <FooterSubtitle>
            Sign up for the latest crypto mining news, updates, and special offers from CryptoVerse.
          </FooterSubtitle>
        </FooterLeft>
        <FooterForm>
          <FooterInput type="email" placeholder="Enter Your Email Address" required />
          <FooterInput type="text" placeholder="MM/DD/YYYY" required />
          <FooterButton type="submit">SIGN UP</FooterButton>
        </FooterForm>
      </FooterTop>

      <DisclaimerText>
        This site is intended for crypto enthusiasts. By signing up, you understand and agree that 
        your data will be collected and used subject to our 
        <FooterLink href="/" style={{ marginLeft: '4px', marginRight: '4px' }}>
          Privacy Policy
        </FooterLink> 
        and 
        <FooterLink href="/" style={{ marginLeft: '4px' }}>
          Terms of Use
        </FooterLink>.
      </DisclaimerText>

      {/* Middle: Columns */}
      <FooterMiddle>
        <FooterColumn>
          <ColumnTitle>CRYPTOVERSE</ColumnTitle>
          <FooterLink href="/about">About Us</FooterLink>
          <FooterLink href="/">Whitepaper</FooterLink>
          <FooterLink href="/">Roadmap</FooterLink>
          <FooterLink href="/">Our Team</FooterLink>
        </FooterColumn>
        <FooterColumn>
          <ColumnTitle>MINING SUPPORT</ColumnTitle>
          <FooterLink href="/">Getting Started</FooterLink>
          <FooterLink href="/">Mining Calculator</FooterLink>
          <FooterLink href="/">Mining Pools</FooterLink>
          <FooterLink href="/">Cloud Mining</FooterLink>
        </FooterColumn>
        <FooterColumn>
          <ColumnTitle>MORE TO EXPLORE</ColumnTitle>
          <FooterLink href="/">Blog & Articles</FooterLink>
          <FooterLink href="/">Tools & Tutorials</FooterLink>
          <FooterLink href="/">Events</FooterLink>
          <FooterLink href="/">Join Our Community</FooterLink>
        </FooterColumn>
      </FooterMiddle>

      {/* Bottom: Legal */}
      <FooterBottom>
        <FooterLegalLinks>
          <FooterLegalLink href="#sitemap">SITE MAP</FooterLegalLink>
          <FooterLegalLink href="#privacy">PRIVACY</FooterLegalLink>
          <FooterLegalLink href="#permission">USER CONTENT PERMISSION TERMS</FooterLegalLink>
          <FooterLegalLink href="#terms">TERMS OF USE</FooterLegalLink>
          <FooterLegalLink href="#adchoices">ADCHOICES</FooterLegalLink>
        </FooterLegalLinks>
        <FooterCopyright>
          © 2025 CryptoVerse Mining
        </FooterCopyright>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
