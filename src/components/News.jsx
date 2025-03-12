import React, { useState, useEffect } from 'react';
import { Select, Avatar } from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import Loader from './Loader';
import { useGetCryptosQuery } from '../services/cryptoApi';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';
const { Option } = Select;

const NEWS_API_KEY = "pub_73729d566c23e2c9bf361adbf3eb2bc934511";

// Styled Components

const NewsContainer = styled.div`
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 16px;
`;

const StyledSelectWrapper = styled.div`
  margin-bottom: 20px;
`;

const NeomorphicCard = styled.div`
  background: #1e1e1e;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow:  8px 8px 16px rgba(0, 0, 0, 0.4), -8px -8px 16px rgba(255, 255, 255, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.5), -10px -10px 20px rgba(255, 255, 255, 0.05);
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
  color: #ccc;
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
`;

const ResponsiveSelect = styled(Select)`
  width: 100%;
`;

// Main Component

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
        // Transform the API response to the structure our component expects
        const transformed = newsData.results.map(article => ({
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
                {news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}
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
