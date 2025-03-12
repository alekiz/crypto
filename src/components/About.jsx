import React from 'react';
import styled from 'styled-components';

// Using your provided image URL
const aboutImage = "https://m.foolcdn.com/media/dubs/images/original_imagesoriginal_imageshttpsg.foolcdn.c.width-880_SfbkM9V.jpg";

const Section = styled.section`
  background: #f0f0f0; /* Light gray background */
  color: #333;
  padding: 60px 20px;
  font-family: 'Roboto', sans-serif;

  @media (min-width: 992px) {
    padding: 80px 60px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #ffd700; /* Gold-like heading */
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  color: #666;
  font-style: italic;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  @media (min-width: 992px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const TextContent = styled.div`
  flex: 1;
  margin-bottom: 30px;
  order: 2; /* Mobile: text comes after image */

  @media (min-width: 992px) {
    margin-bottom: 0;
    order: 1; /* Desktop: text on left */
  }
`;

const Description = styled.p`
  line-height: 1.8;
  font-size: 1rem;
  max-width: 600px;
  margin-bottom: 1.5rem;
  color: #444;
  letter-spacing: 0.5px;
`;

const ImageContainer = styled.div`
  flex: 1;
  text-align: center;
  order: 1; /* Mobile: image comes first */

  @media (min-width: 992px) {
    order: 2;
  }

  img {
    width: 100%;
    max-width: 400px;
    border-radius: 8px;
    object-fit: cover;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
`;

/* Stats section at the bottom */
const StatsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
  gap: 40px;
  justify-content: center;

  @media (min-width: 576px) {
    justify-content: flex-start;
  }
`;

const StatItem = styled.div`
  flex: 1 1 100%;
  text-align: center;

  @media (min-width: 576px) {
    flex: 1 1 auto;
    text-align: left;
    min-width: 180px;
  }
`;

const StatNumber = styled.h4`
  font-size: 1.8rem;
  color: #ffd700;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.p`
  font-size: 1rem;
  color: #555;
`;

const AboutSection = () => {
  return (
    <Section>
      <Container>
        <Title>About Us</Title>
        
        <ContentWrapper>
          <ImageContainer>
            <img src={aboutImage} alt="About CryptoVerse" />
          </ImageContainer>
          <TextContent>
            <Description>
              Welcome to <strong>CryptoVerse</strong> – a next-generation crypto mining and trading platform dedicated to making digital assets accessible to everyone. Our mission is to bridge the gap between novice and expert miners, providing a secure and transparent environment through cutting-edge blockchain technology.
            </Description>
            
          </TextContent>
        </ContentWrapper>
        <StatsRow>
          <StatItem>
            <StatNumber>20,123</StatNumber>
            <StatLabel>Transactions Processed</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>2021</StatNumber>
            <StatLabel>Established Year</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>13,560</StatNumber>
            <StatLabel>Active Users</StatLabel>
          </StatItem>
        </StatsRow>
      </Container>
    </Section>
  );
};

export default AboutSection;
