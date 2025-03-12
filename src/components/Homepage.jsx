import React from "react";
import millify from "millify";
import { Typography, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetGlobalStatsQuery, useGetCryptosQuery } from "../services/cryptoApi.js";
import Cryptocurrencies from "./Cryptocurrencies.jsx";
import News from "./News.jsx";
import Loader from "./Loader.jsx";
import Hero from "../hero.jsx";
import styled, { createGlobalStyle } from "styled-components";

const { Title } = Typography;

/* Global Styles (Dark Theme) */
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #121212;
    color: #fff;
    font-family: 'Roboto', sans-serif;
    scroll-behavior: smooth;
  }
  * {
    box-sizing: border-box;
  }
`;

/* Main page container */
const PageContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

/* Global stats using grid layout */
const StatsRow = styled.div`
  display: grid;
  gap: 2rem;
  margin-bottom: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

/* Individual stat card */
const StatCard = styled.div`
  text-align: center;
  padding: 1rem;
  background-color:rgb(230, 228, 228);
  border-radius: 8px;
`;

/* Section header for coins and news */
const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

/* Container for the crypto coin cards */
const CardsContainer = styled.div`
  display: grid;
  gap: 20px;
  /* 1 column by default, increasing with breakpoints */
  grid-template-columns: repeat(1, 1fr);
  
  @media (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (min-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
  }
  
  @media (min-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

/* Individual crypto coin card */
const CryptoCard = styled.div`
  padding: 10px;
  background-color: #1f1f1f;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

/* Crypto image inside the card */
const CryptoImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  margin-bottom: 0.5rem;
`;

/* Container for heading sections */
const HomeHeadingContainer = styled.div`
  margin-bottom: 2rem;
`;

/* Homepage Component */
const Homepage = () => {
  // Retrieve global stats and top 10 cryptocurrencies
  const { data: globalData, isFetching: isGlobalFetching } = useGetGlobalStatsQuery();
  const { data: cryptosData, isFetching: isCryptosFetching } = useGetCryptosQuery(10);

  const globalStats = globalData?.data || {};
  const cryptos = cryptosData || [];

  if (isGlobalFetching || isCryptosFetching) return <Loader />;
  if (!globalStats.active_cryptocurrencies) return <div>No data available</div>;

  return (
    <>
      <GlobalStyle />
      <Hero />
      <PageContainer>
        <Title level={2} className="heading">Global Crypto Stats</Title>
        <StatsRow>
          <StatCard>
            <Statistic title="Total Cryptocurrencies" value={globalStats.active_cryptocurrencies} />
          </StatCard>
          <StatCard>
            <Statistic title="Total Markets" value={globalStats.markets} />
          </StatCard>
          <StatCard>
            <Statistic title="Total Market Cap" value={`$${millify(globalStats.total_market_cap.usd)}`} />
          </StatCard>
          <StatCard>
            <Statistic title="Total 24h Volume" value={`$${millify(globalStats.total_volume.usd)}`} />
          </StatCard>
          <StatCard>
            <Statistic title="Market Cap Change 24h" value={`${globalStats.market_cap_change_percentage_24h_usd?.toFixed(2)}%`} />
          </StatCard>
        </StatsRow>
        
        <HomeHeadingContainer>
          <SectionHeader>
            <Title level={2} className="home-title">Top 10 Crypto Coins</Title>
            <Title level={3} className="show-more">
              <Link to="/cryptocurrencies" className="show">Show more</Link>
            </Title>
          </SectionHeader>
          <CardsContainer>
            {cryptos.map((coin) => (
              
              <CryptoCard key={coin.id}>
                 <Link to={`/crypto/${coin.id}`} style={{ color: "#4ade80" }}>
                <CryptoImage src={coin.image} alt={coin.name} />
                <Title level={4} style={{ color: "#fff" }}>{coin.name}</Title>
                <p style={{ color: "#ccc" }}>Price: ${millify(coin.current_price)}</p>
                <p style={{ color: "#ccc" }}>Market Cap: ${millify(coin.market_cap)}</p>
                <p style={{ color: "#ccc" }}>Volume: ${millify(coin.total_volume)}</p>
               Details</Link>
              </CryptoCard>
            ))}
          </CardsContainer>
        </HomeHeadingContainer>
        
        <Cryptocurrencies simplified />
        
        <HomeHeadingContainer>
          <SectionHeader>
            <Title level={2} className="home-title">Latest Crypto News</Title>
            <Title level={3}>
              <Link to="/news">Show more</Link>
            </Title>
          </SectionHeader>
        </HomeHeadingContainer>
        
        <News simplified />
      </PageContainer>
    </>
  );
};

export default Homepage;
