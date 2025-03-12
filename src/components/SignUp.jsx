import React, { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from '../api/axios';
import styled from 'styled-components';
import { Navigate, Link } from 'react-router-dom';

const EMAIL_REGEX = /^\S+@\S+$/i;
const REGISTER_URL = '/api/auth/signup';

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
  margin-top: 4px;
`;

const LinkContainer = styled.div`
  text-align: center;
  margin-top: 10px;
  font-size: 0.85rem;
  color: #333;
`;

const SignUp = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const userRef = useRef();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const password = watch('password', '');

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [watch('username'), watch('email'), watch('password'), watch('confirmPassword'), watch('country'), watch('phoneNumber')]);

  const onSubmit = async (data) => {
    if (!data.username || !data.password || !data.email) {
      setErrMsg('Please fill in all required fields.');
      return;
    }
    if (!EMAIL_REGEX.test(data.email)) {
      setErrMsg('Invalid email address');
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
          country: data.country,
          phoneNumber: data.phoneNumber
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: false
        }
      );
      console.log(JSON.stringify(response?.data));
      setSuccess(true);
    } catch (error) {
      if (!error?.response) {
        setErrMsg('No Server Response');
      } else if (error.response?.status === 409) {
        setErrMsg('Username or Email Taken');
      } else {
        setErrMsg('Registration Failed');
      }
      if (errRef.current) {
        errRef.current.focus();
      }
    }
  };

  if (success) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <Container>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <Title>Crypto Mining App Sign Up</Title>
        {errMsg && <ErrorText ref={errRef} aria-live="assertive">{errMsg}</ErrorText>}
        <NeomorphicInput
          type="text"
          placeholder="Username"
          defaultValue=""
          {...register("username", { required: "Username is required" })}
          ref={userRef}
        />
        {errors.username && <ErrorText>{errors.username.message}</ErrorText>}
        <NeomorphicInput
          type="email"
          placeholder="Email"
          defaultValue=""
          {...register("email", { 
            required: "Email is required", 
            pattern: { value: EMAIL_REGEX, message: "Invalid email address" }
          })}
        />
        {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
        <NeomorphicInput
          type="password"
          placeholder="Password"
          defaultValue=""
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
        <NeomorphicInput
          type="password"
          placeholder="Confirm Password"
          defaultValue=""
          {...register("confirmPassword", { 
            required: "Please confirm your password", 
            validate: value => value === password || "Passwords do not match"
          })}
        />
        {errors.confirmPassword && <ErrorText>{errors.confirmPassword.message}</ErrorText>}
        <NeomorphicInput
          type="text"
          placeholder="Country"
          defaultValue=""
          {...register("country", { required: "Country is required" })}
        />
        {errors.country && <ErrorText>{errors.country.message}</ErrorText>}
        <NeomorphicInput
          type="text"
          placeholder="Phone Number"
          defaultValue=""
          {...register("phoneNumber", { required: "Phone number is required" })}
        />
        {errors.phoneNumber && <ErrorText>{errors.phoneNumber.message}</ErrorText>}
        <NeomorphicButton type="submit">Sign Up</NeomorphicButton>
        <LinkContainer>
          Already have an account? <Link to="/signin">Sign In</Link>
        </LinkContainer>
      </FormWrapper>
    </Container>
  );
};

export default SignUp;
