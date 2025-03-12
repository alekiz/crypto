import React, { useState, useEffect, useRef } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate.js';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Chart from 'chart.js/auto';

// Global Styles (Dark Theme)
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

// -------------------------
// Styled Components
// -------------------------
const Container = styled.div`
  width: 100%;
  padding: 20px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1f1f1f;
  padding: 10px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #4ade80;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const NavLink = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    color: #4ade80;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const DashboardHeader = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #4ade80;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const Card = styled.div`
  background-color: #1f1f1f;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
`;

const CardTitle = styled.h3`
  margin: 0 0 10px;
  color: #9ca3af;
`;

const CardValue = styled.p`
  font-size: 1.3rem;
  margin: 0;
`;

const FormSection = styled.div`
  background-color: #1f1f1f;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 10px;
  color: #9ca3af;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #9ca3af;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #3b3f40;
  border-radius: 4px;
  background-color: #121212;
  color: #fff;
  &:focus {
    outline: none;
    border-color: #4ade80;
  }
`;

const Button = styled.button`
  padding: 10px;
  background-color: #4ade80;
  border: none;
  border-radius: 4px;
  color: #000;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #6ee7b7;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Message = styled.p`
  text-align: center;
  margin-top: 10px;
  color: ${({ error }) => (error ? 'red' : '#4ade80')};
`;

const ChartSection = styled.div`
  background-color: #1f1f1f;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 10px;
  color: #9ca3af;
`;

const StyledCanvas = styled.canvas`
  width: 100% !important;
  max-height: 300px;
  background-color: #121212;
  border-radius: 8px;
`;

// Helper: Format Phone Number
const formatPhoneNumber = (input) => {
  if (!input) return '';
  const cleaned = input.replace(/\D/g, '');
  if (cleaned.length === 10 && cleaned.startsWith('0')) {
    return '+254' + cleaned.substring(1);
  }
  if (cleaned.length === 12 && cleaned.startsWith('254')) {
    return '+' + cleaned;
  }
  if (input.startsWith('+254') && cleaned.length === 13) {
    return input;
  }
  return '+254' + cleaned;
};

function Dashboard() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [totalInvested, setTotalInvested] = useState(0);
  const [mines, setMines] = useState(0);
  const [possiblePayout, setPossiblePayout] = useState(0);
  const [btcPrice, setBtcPrice] = useState(0);
  const [investmentInput, setInvestmentInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('2547');
  const [formMessage, setFormMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const miningChartRef = useRef(null);
  const miningChartInstance = useRef(null);
  const priceChartRef = useRef(null);
  const priceChartInstance = useRef(null);
  const investmentFormRef = useRef(null);

  // Fetch user data from the protected endpoint with cleanup
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchUserData = async () => {
      try {
        const response = await axiosPrivate.get('/api/auth/protected', {
          signal: controller.signal,
        });
        const data = response.data;
        if (isMounted && data.user) {
          setUser({
            email: data.user.email,
            phone: data.user.phoneNumber || '',
          });
          setTotalInvested(data.user.investmentBalance || 0);
          setMines(data.user.mines || 0);
          setPhoneInput(data.user.phoneNumber || '2547');
        }
      } catch (err) {
        // If the error is due to cancellation, silently ignore it.
        if (err.name !== 'CanceledError') {
          console.error('Error loading user data:', err);
          navigate('/signin', { state: { from: location }, replace: true });
        }
      }
    };

    fetchUserData();

    return () => {
      isMounted = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update number of mines whenever totalInvested changes
  useEffect(() => {
    setMines(Math.floor(totalInvested / 500));
  }, [totalInvested]);

  // Mining simulation: Increase possible payout, capped at 600 Ksh per day
  useEffect(() => {
    let isMounted = true;
    const timer = setInterval(() => {
      if (isMounted) {
        const increment = totalInvested * 0.0001;
        setPossiblePayout(prev => Math.min(prev + increment, 600));
      }
    }, 1000);
    return () => {
      isMounted = false;
      clearInterval(timer);
    };
  }, [totalInvested]);

  // Fetch BTC price from Binance and convert to Ksh
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT', {
      signal: controller.signal,
    })
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          const usdPrice = Number(data.price);
          setBtcPrice((usdPrice * 110).toFixed(2));
        }
      })
      .catch(() => {
        if (isMounted) setBtcPrice(48000);
      });
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  // Initialize charts with cleanup
  useEffect(() => {
    // Mining Performance Chart
    if (miningChartRef.current) {
      if (miningChartInstance.current) {
        miningChartInstance.current.destroy();
      }
      miningChartInstance.current = new Chart(miningChartRef.current, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Mining Performance (TH/s)',
            data: [100, 120, 130, 125, 140, 150],
            borderColor: '#4ade80',
            backgroundColor: 'rgba(74, 222, 128, 0.2)',
            borderWidth: 2,
            fill: true,
          }],
        },
        options: { responsive: true, maintainAspectRatio: false },
      });
    }
    // BTC Price History Chart (converted to Ksh)
    if (priceChartRef.current) {
      if (priceChartInstance.current) {
        priceChartInstance.current.destroy();
      }
      const priceDataKsh = [48000, 48200, 47800, 48500, 49000, 48800, 49200].map(val => val * 110);
      priceChartInstance.current = new Chart(priceChartRef.current, {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'BTC Price History (Ksh)',
            data: priceDataKsh,
            borderColor: '#fbbf24',
            backgroundColor: 'rgba(251,191,36,0.2)',
            borderWidth: 2,
            fill: true,
          }],
        },
        options: { responsive: true, maintainAspectRatio: false },
      });
    }
    return () => {
      if (miningChartInstance.current) miningChartInstance.current.destroy();
      if (priceChartInstance.current) priceChartInstance.current.destroy();
    };
  }, []);

  // Investment Form Submission Handler
  const handleInvestmentSubmit = async (e) => {
    e.preventDefault();
    // Optionally, validate the investment amount and phone input here
    // Redirect to the Paystack payment page
    window.location.href = "https://paystack.com/pay/rhx8gu3xx7";
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <ContentWrapper>
          <DashboardHeader>Mining Dashboard</DashboardHeader>
          <CardsContainer>
            <Card>
              <CardTitle>Total Invested</CardTitle>
              <CardValue>Ksh {totalInvested.toLocaleString()}</CardValue>
            </Card>
            <Card>
              <CardTitle>Number of Mines</CardTitle>
              <CardValue>{mines}</CardValue>
            </Card>
            <Card>
              <CardTitle>Possible Payout</CardTitle>
              <CardValue>Ksh {possiblePayout.toFixed(2)}</CardValue>
            </Card>
            <Card>
              <CardTitle>BTC Price</CardTitle>
              <CardValue>Ksh {btcPrice.toLocaleString()}</CardValue>
            </Card>
          </CardsContainer>
          <FormSection ref={investmentFormRef}>
            <FormTitle>Invest &amp; Mine</FormTitle>
            <StyledForm onSubmit={handleInvestmentSubmit}>
              <FormGroup>
                <Label htmlFor="investmentInput">Investment Amount (Ksh)</Label>
                <Input
                  type="number"
                  id="investmentInput"
                  value={investmentInput}
                  onChange={(e) => setInvestmentInput(e.target.value)}
                  placeholder="e.g. 5000"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="phoneInput">Phone Number</Label>
                <Input
                  type="text"
                  id="phoneInput"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  placeholder="e.g. 254712345678"
                  required
                />
              </FormGroup>
              <Button type="submit" disabled={isProcessing}>
                
                {isProcessing ? 'Processing...' : 'Initiate Payment'}
              </Button>
            </StyledForm>
            {formMessage && <Message error={formMessage.toLowerCase().includes('error')}>{formMessage}</Message>}
          </FormSection>
          <ChartSection>
            <SectionTitle>Mining Performance</SectionTitle>
            <StyledCanvas ref={miningChartRef} />
          </ChartSection>
          <ChartSection>
            <SectionTitle>BTC Price History</SectionTitle>
            <StyledCanvas ref={priceChartRef} />
          </ChartSection>
        </ContentWrapper>
      </Container>
    </>
  );
}

export default Dashboard;
