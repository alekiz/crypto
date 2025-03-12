import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  width: 100%;
  background-color: #ffffff;
  color: #000000;
  font-family: 'Roboto', sans-serif;
`;

/* 1. HERO SECTION */
const HeroSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 120px 20px;
  background: #ffffff;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 80px 16px;
  }
`;

const HeroContent = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: #0d0d0d;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const HeroSubtitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: 2rem;
  color: #333333;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const HeroButton = styled.button`
  background-color: #3333ff;
  color: #ffffff;
  padding: 14px 28px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #1a1acc;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
  }
`;

/* 2. ABOUT CRYPTO MINING SECTION */
const AboutSection = styled.section`
  padding: 80px 20px;
  background: #ffffff;
  text-align: center;

  @media (max-width: 768px) {
    padding: 60px 16px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #0d0d0d;
`;

const SectionSubtitle = styled.p`
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 2rem;
  font-size: 1rem;
  color: #555555;
  line-height: 1.6;
`;

const AboutGrid = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 40px;
  margin-top: 40px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }
`;

const AboutCard = styled.div`
  background: #f5f5f5;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  text-align: left;

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
`;

const AboutCardTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: #222222;
`;

const AboutCardDesc = styled.p`
  font-size: 1rem;
  color: #555555;
  line-height: 1.5;
`;

/* 3. CRYPTO WALLET FROM THE FUTURE SECTION */
const WalletSection = styled.section`
  background: #ffffff;
  padding: 80px 20px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 60px 16px;
  }
`;

const WalletContent = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const WalletTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #0d0d0d;
`;

const WalletSubtitle = styled.p`
  font-size: 1rem;
  color: #555555;
  margin-bottom: 2rem;
  max-width: 800px;
  margin: 0 auto 2rem auto;
  line-height: 1.6;
`;

/* 4. SECURITY SECTION */
const SecuritySection = styled.section`
  background: #ffffff;
  padding: 80px 20px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 60px 16px;
  }
`;

const SecurityContent = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const SecurityTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #0d0d0d;
`;

const SecuritySubtitle = styled.p`
  font-size: 1rem;
  color: #555555;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const SecurityItemsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
`;

const SecurityItem = styled.div`
  flex: 1 1 220px;
  min-width: 220px;
  max-width: 280px;
  background: #f5f5f5;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);

  &:hover {
    box-shadow: 0 4px 10px rgba(0,0,0,0.12);
  }
`;

const SecurityItemTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #222222;
`;

const SecurityItemDesc = styled.p`
  font-size: 0.95rem;
  color: #555555;
  line-height: 1.4;
`;

/* 5. FULLY FEATURED SECTION */
const FeaturedSection = styled.section`
  padding: 80px 20px;
  background: #ffffff;
  text-align: center;

  @media (max-width: 768px) {
    padding: 60px 16px;
  }
`;

const FeaturedContent = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const FeaturedTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #0d0d0d;
`;

const FeaturedSubtitle = styled.p`
  font-size: 1rem;
  color: #555555;
  margin-bottom: 2rem;
  max-width: 800px;
  margin: 0 auto 2rem auto;
  line-height: 1.6;
`;

const FeaturedStatsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
`;

const StatBox = styled.div`
  flex: 1 1 200px;
  min-width: 200px;
  max-width: 240px;
  background: #f5f5f5;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);

  &:hover {
    box-shadow: 0 4px 10px rgba(0,0,0,0.12);
  }
`;

const StatNumber = styled.h3`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #222222;
`;

const StatLabel = styled.p`
  font-size: 1rem;
  color: #555555;
`;

/* 6. CTA SECTION */
const CTASection = styled.section`
  background: #3333ff;
  color: #ffffff;
  text-align: center;
  padding: 100px 20px;

  @media (max-width: 768px) {
    padding: 60px 16px;
  }
`;

const CTATitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const CTASubtitle = styled.p`
  font-size: 1rem;
  margin-bottom: 2rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const CTAButton = styled.button`
  background: #1a1acc;
  color: #ffffff;
  padding: 14px 28px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: #0d0d99;
  }
`;

const CryptoVerseLanding = () => {
  return (
    <PageContainer>
      {/* 1. HERO */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>Buy and Mine Cryptos Like Never Before</HeroTitle>
          <HeroSubtitle>
            Welcome to CryptoVerse – your next-gen platform to explore, mine, and trade top cryptocurrencies effortlessly.
          </HeroSubtitle>
          <HeroButton>Get Started</HeroButton>
        </HeroContent>
      </HeroSection>

      {/* 2. ABOUT CRYPTO MINING */}
      <AboutSection>
        <SectionTitle>About Crypto Mining</SectionTitle>
        <SectionSubtitle>
          Crypto mining is the process of verifying and adding new transactions to the blockchain while earning newly minted cryptocurrency as a reward. 
          By using specialized hardware or cloud-based solutions, miners solve complex cryptographic puzzles, secure the network, and get compensated for their computational efforts. 
          This process ensures decentralized consensus, making cryptocurrencies trustless and permissionless. 
          Whether you’re a beginner or a seasoned pro, CryptoVerse provides the tools, insights, and community support you need to succeed in this fast-growing space.
        </SectionSubtitle>
        <AboutGrid>
          <AboutCard>
            <AboutCardTitle>1. Decentralization</AboutCardTitle>
            <AboutCardDesc>
              Mining supports the core principle of blockchain technology—removing the need for centralized authorities. 
              By contributing your computing power, you help keep transactions transparent and tamper-proof.
            </AboutCardDesc>
          </AboutCard>
          <AboutCard>
            <AboutCardTitle>2. Financial Rewards</AboutCardTitle>
            <AboutCardDesc>
              Successful miners earn crypto block rewards plus transaction fees, providing a potentially lucrative source of income.
            </AboutCardDesc>
          </AboutCard>
          <AboutCard>
            <AboutCardTitle>3. Network Security</AboutCardTitle>
            <AboutCardDesc>
              Miners maintain the integrity of the blockchain. More miners mean a stronger, more resilient network resistant to attacks.
            </AboutCardDesc>
          </AboutCard>
          <AboutCard>
            <AboutCardTitle>4. Global Impact</AboutCardTitle>
            <AboutCardDesc>
              By participating, you join a worldwide community shaping the future of finance, decentralization, and technology.
            </AboutCardDesc>
          </AboutCard>
        </AboutGrid>
      </AboutSection>

      {/* 3. CRYPTO WALLET FROM THE FUTURE */}
      <WalletSection>
        <WalletContent>
          <WalletTitle>Crypto Wallet From the Future</WalletTitle>
          <WalletSubtitle>
            Securely store and manage your cryptocurrencies in one place. Our futuristic wallet offers intuitive design, 
            lightning-fast transactions, and multi-layer encryption. 
            Easily connect to mining pools, track your rewards, and swap between different coins without leaving your wallet.
          </WalletSubtitle>
        </WalletContent>
      </WalletSection>

      {/* 4. SECURITY SECTION */}
      <SecuritySection>
        <SecurityContent>
          <SecurityTitle>Bulletproof Security by Design</SecurityTitle>
          <SecuritySubtitle>
            We prioritize the safety of your assets, transactions, and personal data. 
            With advanced encryption, real-time monitoring, and international compliance, you can focus on growing your portfolio with peace of mind.
          </SecuritySubtitle>
          <SecurityItemsWrapper>
            <SecurityItem>
              <SecurityItemTitle>256-bit Encryption</SecurityItemTitle>
              <SecurityItemDesc>
                All transactions are secured with advanced cryptographic protocols, ensuring your data remains private and safe.
              </SecurityItemDesc>
            </SecurityItem>
            <SecurityItem>
              <SecurityItemTitle>100% Uptime</SecurityItemTitle>
              <SecurityItemDesc>
                Our globally distributed infrastructure guarantees minimal downtime for uninterrupted trading and mining.
              </SecurityItemDesc>
            </SecurityItem>
            <SecurityItem>
              <SecurityItemTitle>CISA Compliance</SecurityItemTitle>
              <SecurityItemDesc>
                We adhere to industry standards and guidelines to meet the highest security requirements in the crypto world.
              </SecurityItemDesc>
            </SecurityItem>
          </SecurityItemsWrapper>
        </SecurityContent>
      </SecuritySection>

      {/* 5. FULLY FEATURED SECTION */}
      <FeaturedSection>
        <FeaturedContent>
          <FeaturedTitle>Fully Featured to Buy, Trade, and Invest in Crypto</FeaturedTitle>
          <FeaturedSubtitle>
            From mining and staking to quick trades and long-term holds, CryptoVerse has it all. Our intuitive dashboard, 
            real-time analytics, and robust trading engine let you manage your entire crypto journey in one place.
          </FeaturedSubtitle>
          <FeaturedStatsWrapper>
            <StatBox>
              <StatNumber>256</StatNumber>
              <StatLabel>Bit Encryption</StatLabel>
            </StatBox>
            <StatBox>
              <StatNumber>100%</StatNumber>
              <StatLabel>Uptime Guarantee</StatLabel>
            </StatBox>
            <StatBox>
              <StatNumber>CISA</StatNumber>
              <StatLabel>Compliant</StatLabel>
            </StatBox>
          </FeaturedStatsWrapper>
        </FeaturedContent>
      </FeaturedSection>

      {/* 6. CTA SECTION */}
      <CTASection>
        <CTATitle>Ready to Get Started?</CTATitle>
        <CTASubtitle>
          Sign up and begin your journey into crypto mining with CryptoVerse. 
          Seamlessly explore top currencies, enjoy unmatched security, and join a global community shaping the future of decentralized finance.
        </CTASubtitle>
        <CTAButton>Join CryptoVerse</CTAButton>
      </CTASection>
    </PageContainer>
  );
};

export default CryptoVerseLanding;
