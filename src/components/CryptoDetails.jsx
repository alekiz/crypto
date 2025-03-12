import React, { useState, useEffect } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select, Spin } from 'antd';
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';

import TradingViewWidget from './trading';
 // Import your custom CSS

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState('7d');
  const [cryptoDetails, setCryptoDetails] = useState(null);
  const [coinHistory, setCoinHistory] = useState(null);
  const [loading, setLoading] = useState(true);

  // Map time period string to days for CoinGecko API
  const timeMapping = {
    '3h': 1, // approximation since API uses full days
    '24h': 1,
    '7d': 7,
    '30d': 30,
    '1y': 365,
    '3m': 90,
    '3y': 1095,
    '5y': 1825,
  };

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    const days = timeMapping[timeperiod] || 7;

    const fetchData = async () => {
      try {
        // Fetch coin details
        const detailsResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
          { signal }
        );
        const detailsData = await detailsResponse.json();
        // Fetch market chart data
        const historyResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`,
          { signal }
        );
        const historyData = await historyResponse.json();

        setCryptoDetails(detailsData);
        setCoinHistory(historyData);
        setLoading(false);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          console.error('Error fetching data:', error);
        }
        setLoading(false);
      }
    };

    fetchData();
    return () => abortController.abort();
  }, [coinId, timeperiod]);

  if (loading || !cryptoDetails) {
    return (
      <div className="loader-container">
        <Spin size="large" />
      </div>
    );
  }

  // Array of time period options
  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    {
      title: 'Price to USD',
      value: `$ ${cryptoDetails.market_data.current_price.usd ? millify(cryptoDetails.market_data.current_price.usd) : '-'}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: 'Rank',
      value: cryptoDetails.market_cap_rank || '-',
      icon: <NumberOutlined />,
    },
    {
      title: '24h Volume',
      value: `$ ${cryptoDetails.market_data.total_volume.usd ? millify(cryptoDetails.market_data.total_volume.usd) : '-'}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: 'Market Cap',
      value: `$ ${cryptoDetails.market_data.market_cap.usd ? millify(cryptoDetails.market_data.market_cap.usd) : '-'}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: 'All-time-high (daily avg.)',
      value: `$ ${cryptoDetails.market_data.ath.usd ? millify(cryptoDetails.market_data.ath.usd) : '-'}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: 'Total Supply',
      value: cryptoDetails.market_data.total_supply ? `$ ${millify(cryptoDetails.market_data.total_supply)}` : '-',
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Circulating Supply',
      value: cryptoDetails.market_data.circulating_supply ? `$ ${millify(cryptoDetails.market_data.circulating_supply)}` : '-',
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Number Of Markets',
      value: '-', // Not provided by CoinGecko
      icon: <FundOutlined />,
    },
    {
      title: 'Number Of Exchanges',
      value: '-', // Not provided by CoinGecko
      icon: <MoneyCollectOutlined />,
    },
    {
      title: 'Approved Supply',
      value: cryptoDetails.market_data.total_supply ? <CheckOutlined /> : <StopOutlined />,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails.name} ({cryptoDetails.symbol.toUpperCase()}) Price
        </Title>
        <p className="coin-subtitle">
          {cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap, and supply.
        </p>
      </Col>

      <Row justify="center" className="time-selector-row">
        <Select
          defaultValue="7d"
          className="select-timeperiod"
          onChange={(value) => setTimeperiod(value)}
          style={{ width: 120 }}
        >
          {time.map((date) => (
            <Option key={date} value={date}>
              {date}
            </Option>
          ))}
        </Select>
      </Row>

      <Row justify="center" className="widget-row">
        <TradingViewWidget />
      </Row>

      <Row className="stats-container" gutter={[32, 32]}>
        <Col xs={24} md={12}>
          <Col className="coin-value-statistics">
            <Col className="section-heading">
              <Title level={3}>{cryptoDetails.name} Value Statistics</Title>
              <p>An overview showing the statistics of {cryptoDetails.name}.</p>
            </Col>
            {stats.map(({ icon, title, value }) => (
              <Row key={title} className="coin-stats">
                <Col className="coin-stats-name">
                  <Text className="icon">{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Col>
                  <Text className="stats-value">{value}</Text>
                </Col>
              </Row>
            ))}
          </Col>
        </Col>
        <Col xs={24} md={12}>
          <Col className="other-stats-info">
            <Col className="section-heading">
              <Title level={3}>Other Stats Info</Title>
              <p>An overview showing additional statistics of {cryptoDetails.name}.</p>
            </Col>
            {genericStats.map(({ icon, title, value }) => (
              <Row key={title} className="coin-stats">
                <Col className="coin-stats-name">
                  <Text className="icon">{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Col>
                  <Text className="stats-value">{value}</Text>
                </Col>
              </Row>
            ))}
          </Col>
        </Col>
      </Row>

      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3}>What is {cryptoDetails.name}?</Title>
          {cryptoDetails.description?.en
            ? HTMLReactParser(cryptoDetails.description.en)
            : 'No description available.'}
        </Row>
        <Col className="coin-links">
          <Title level={3}>{cryptoDetails.name} Links</Title>
          {cryptoDetails.links?.homepage?.[0] && (
            <Row className="coin-link">
              <Title level={5} className="link-name">
                Homepage
              </Title>
              <a href={cryptoDetails.links.homepage[0]} target="_blank" rel="noreferrer">
                {cryptoDetails.links.homepage[0]}
              </a>
            </Row>
          )}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
