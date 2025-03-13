import React, { useState, useEffect } from 'react';
import { Avatar } from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import Loader from './Loader';

const demoImage = 'https://i.sstatic.net/mwFzF.png';
// Your NewsAPI.org API key
const NEWS_API_KEY = "3d5f4a77ed5347d4a27c951feca4bda1";

const NewsContainer = styled.div`
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 16px;
`;

const NeomorphicCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.15), -10px -10px 20px rgba(0, 0, 0, 0.05);
  }
`;

const CardLink = styled.a`
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
`;

const NewsImageContainer = styled.div`
  text-align: center;
  margin-bottom: 16px;
  img {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 12px;
  }
`;

const NewsTitle = styled.h4`
  font-size: 1.3rem;
  color: #f7931a;
  margin-bottom: 8px;
  text-align: center;
`;

const NewsDescription = styled.p`
  font-size: 0.95rem;
  color: #333;
  line-height: 1.4;
  margin-bottom: 16px;
  text-align: justify;
`;

const ProviderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const ProviderInfo = styled.div`
  display: flex;
  align-items: center;
  .ant-avatar {
    margin-right: 8px;
  }
`;

const NewsText = styled.span`
  color: #aaa;
  font-size: 0.85rem;
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  justify-content: center;
`;

const CryptoNews = () => {
  const [cryptoNews, setCryptoNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const count = 12;
        const response = await fetch(
  `https://newsapi.org/v2/everything?q=cryptocurrency&language=en&pageSize=${count}&apiKey=${NEWS_API_KEY}`,
  {
    headers: {
      "Upgrade-Insecure-Requests": "1"
    }
  }
);
        const newsData = await response.json();
        // Use a fallback empty array if articles is undefined
        const articles = newsData.articles || [];
        const transformed = articles.map(article => ({
          url: article.url,
          name: article.title,
          description: article.description || "",
          datePublished: article.publishedAt,
          image: { thumbnail: { contentUrl: article.urlToImage || demoImage } },
          provider: [{
            name: article.source?.name || "Unknown",
            image: { thumbnail: { contentUrl: demoImage } }
          }]
        }));
        setCryptoNews({ value: transformed });
      } catch (error) {
        console.error('Error fetching crypto news:', error);
      }
    };

    fetchNews();
  }, []);

  if (!cryptoNews || !cryptoNews.value) return <Loader />;

  return (
    <NewsContainer>
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
                {news.description 
                  ? (news.description.length > 100 
                      ? `${news.description.substring(0, 100)}...` 
                      : news.description)
                  : "No description available."}
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

export default CryptoNews;
