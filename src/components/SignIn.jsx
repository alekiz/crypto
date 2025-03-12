import React, { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import axios from '../api/axios';
import styled from 'styled-components';

const LOGIN_URL = '/api/auth/signin';

const Container = styled.div`
  background: #e0e0e0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled.form`
  background: #e0e0e0;
  padding: 40px;
  border-radius: 20px;
  width: 350px;
  box-shadow: 8px 8px 16px #bebebe, -8px -8px 16px #ffffff;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif;
`;

const NeomorphicInput = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: none;
  border-radius: 10px;
  background: #e0e0e0;
  box-shadow: inset 4px 4px 8px #bebebe, inset -4px -4px 8px #ffffff;
  font-size: 1rem;
  color: #333;
  &:focus {
    outline: none;
  }
`;

const NeomorphicButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #e0e0e0;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  color: #333;
  margin-top: 10px;
  box-shadow: 4px 4px 8px #bebebe, -4px -4px 8px #ffffff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:active {
    box-shadow: inset 4px 4px 8px #bebebe, inset -4px -4px 8px #ffffff;
  }
`;

const ErrorText = styled.span`
  color: #ff6666;
  font-size: 0.85rem;
  text-align: center;
`;

const LinkContainer = styled.div`
  text-align: center;
  margin-top: 10px;
  font-size: 0.85rem;
  color: #333;
`;

const SignIn = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Always redirect to dashboard after sign in
  const from = '/dashboard';

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: false,
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ email, roles, accessToken });
      setEmail('');
      setPassword('');
      setRedirect(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Email or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      if (errRef.current) {
        errRef.current.focus();
      }
    }
  };

  if (redirect) {
    return <Navigate to={from} replace />;
  }

  return (
    <Container>
      <FormWrapper onSubmit={handleSubmit}>
        <Title>Crypto Mining App Sign In</Title>
        {errMsg && <ErrorText ref={errRef} aria-live="assertive">{errMsg}</ErrorText>}
        <NeomorphicInput
          type="email"
          placeholder="Email"
          ref={emailRef}
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <NeomorphicInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <NeomorphicButton type="submit">Sign In</NeomorphicButton>
        <LinkContainer>
          Need an account? <Link to="/signup">Sign Up</Link>
        </LinkContainer>
      </FormWrapper>
    </Container>
  );
};

export default SignIn;
