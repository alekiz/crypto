import React, { useState, useEffect } from 'react';
import { Select, Avatar } from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import Loader from './Loader';
import { useGetCryptosQuery } from '../services/cryptoApi';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';
const { Option } = Select;

const NEWS_API_KEY = "pub_73729d566c23e2c9bf361adbf3eb2bc934511";

// Container for the entire news section
const NewsContainer = styled.div`
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 16px;
  @media (max-width: 768px) {
    padding: 0 12px;
  }
`;

// Wrapper for the Select input
const StyledSelectWrapper = styled.div`
  margin-bottom: 20px;
`;

// Updated neomorphic card with modern light styling
const NeomorphicCard = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 4px 4px 10px rgba(0,0,0,0.1), -4px -4px 10px rgba(255,255,255,0.7);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 6px 6px 14px rgba(0,0,0,0.15), -6px -6px 14px rgba(255,255,255,0.7);
  }
`;

// Link wrapping each card
const CardLink = styled.a`
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
`;

// Image container with responsive image styling
const NewsImageContainer = styled.div`
  text-align: center;
  margin-bottom: 16px;
  img {
    width: 100%;
    max-height: 200px;
    height: auto;
    object-fit: cover;
    border-radius: 12px;
  }
`;

// Title styling with responsive font sizes
const NewsTitle = styled.h4`
  font-size: 1.2rem;
  color: #f7931a;
  margin-bottom: 8px;
  text-align: center;
  @media (max-width: 576px) {
    font-size: 1.1rem;
  }
`;

// Description text styling
const NewsDescription = styled.p`
  font-size: 0.9rem;
  color: #555;
  line-height: 1.5;
  margin-bottom: 16px;
  text-align: justify;
  @media (max-width: 576px) {
    font-size: 0.85rem;
  }
`;

// Container for provider info and publication time
const ProviderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

// Provider details styling
const ProviderInfo = styled.div`
  display: flex;
  align-items: center;
  .ant-avatar {
    margin-right: 8px;
  }
`;

// Styling for provider name and publication time
const NewsText = styled.span`
  color: #888;
  font-size: 0.8rem;
  @media (max-width: 576px) {
    font-size: 0.75rem;
  }
`;

// Grid layout for news cards
const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  @media (max-width: 768px) {
    gap: 16px;
  }
`;

// Responsive select input styling
const ResponsiveSelect = styled(Select)`
  width: 100%;
`;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const [cryptoNews, setCryptoNews] = useState(null);
  const { data } = useGetCryptosQuery(100);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const count = simplified ? 6 : 12;
        const response = await fetch(
          `https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&q=${encodeURIComponent(newsCategory)}&language=en`
        );
        const newsData = await response.json();
        const results = newsData.results || [];
        // Transform the API response to the structure our component expects
        const transformed = results.map(article => ({
          url: article.link,
          name: article.title,
          description: article.description || "",
          datePublished: article.pubDate,
          image: { thumbnail: { contentUrl: article.image_url || demoImage } },
          provider: [{
            name: article.source || "Unknown",
            image: { thumbnail: { contentUrl: demoImage } }
          }]
        }));
        setCryptoNews({ value: transformed.slice(0, count) });
      } catch (error) {
        console.error('Error fetching crypto news:', error);
      }
    };

    fetchNews();
  }, [newsCategory, simplified]);

  if (!cryptoNews || !cryptoNews.value) return <Loader />;

  return (
    <NewsContainer>
      {!simplified && (
        <StyledSelectWrapper>
          <ResponsiveSelect
            showSearch
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins?.map(currency => (
              <Option key={currency.name} value={currency.name}>
                {currency.name}
              </Option>
            ))}
          </ResponsiveSelect>
        </StyledSelectWrapper>
      )}
      <NewsGrid>
        {cryptoNews.value.map((news, i) => (
          <NeomorphicCard key={i}>
            <CardLink href={news.url} target="_blank" rel="noreferrer">
              <NewsImageContainer>
                <NewsTitle>{news.name}</NewsTitle>
                <img 
                  src={news.image.thumbnail.contentUrl || demoImage} 
                  alt="news" 
                />
              </NewsImageContainer>
              <NewsDescription>
                {news.description.length > 100 
                  ? `${news.description.substring(0, 100)}...` 
                  : news.description}
              </NewsDescription>
              <ProviderContainer>
                <ProviderInfo>
                  <Avatar src={news.provider[0]?.image.thumbnail.contentUrl || demoImage} alt="" />
                  <NewsText>{news.provider[0]?.name}</NewsText>
                </ProviderInfo>
                <NewsText>{moment(news.datePublished).startOf('ss').fromNow()}</NewsText>
              </ProviderContainer>
            </CardLink>
          </NeomorphicCard>
        ))}
      </NewsGrid>
    </NewsContainer>
  );
};

export default News;
