import React, { useState } from "react";
import styled from "styled-components";
import {
  handleError,
  handleSuccess,
  slideInFromLeft,
  slideInFromRight,
} from "../utils";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
function Signup() {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigateTo = useNavigate();

  const handleChange = async (e) => {
    const { name, value } = e.target;
    const copyUserInfo = { ...newUser }; //shallow copy
    copyUserInfo[name] = value;
    setNewUser(copyUserInfo);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("handleSignup");

    try {
      const url = "https://auth-mern-app-schk.vercel.app/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const result = await response.json();
      console.log(result);
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigateTo("/login");
        }, 3000);
      } else if (error) {
        const details = error?.details[0].message; //?. optional chaining operator 2020 introduced. es11
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  console.log("login info", newUser);
  return (
    <SignupContainer>
      <ImageSide>
        {/* Replace with an image or gradient */}
        <TextContainer>
          <h2>Become a Member.</h2>
          <p>Start your journey with us today.</p>
        </TextContainer>
      </ImageSide>
      <FormSide>
        <h1>Create Account</h1>
        <form onSubmit={handleSignup}>
          <Label>
            Name
            <Input
              type="text"
              name="name"
              value={newUser.name}
              placeholder="Enter Name"
              autoFocus
              onChange={handleChange}
              required
            />
          </Label>
          <Label>
            Email
            <Input
              type="email"
              name="email"
              value={newUser.email}
              placeholder="Enter Email"
              onChange={handleChange}
              required
            />
          </Label>
          <Label>
            Password
            <Input
              type="password"
              name="password"
              value={newUser.password}
              placeholder="Enter Password"
              onChange={handleChange}
              required
            />
          </Label>
          <SubmitButton type="submit">Sign Up</SubmitButton>
          <p>
            Already have an account ? <Link to="/login">Login</Link>
          </p>
        </form>
      </FormSide>
      <ToastContainer />
    </SignupContainer>
  );
}

export default Signup;

// Styled Components

const SignupContainer = styled.div`
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto; /* Better control over height */
  }
`;

const TextContainer = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100vh;
  align-content: center;

  h2 {
    font-size: clamp(
      1.8rem,
      5vw,
      2.5rem
    ); // Minimum 1.8rem, preferred size is 5vw, and maximum 3.2rem
  }

  p {
    font-size: clamp(
      1.4rem,
      4vw,
      2rem
    ); // Minimum 1.4rem, preferred size is 4vw, and maximum 2.5rem
  }

  @media (max-width: 768px) {
    height: auto; /* Prevent height inheritance issues */
  }
`;

const ImageSide = styled.div`
  flex: 1;
  background: linear-gradient(to right, #ff7e5f, #feb47b); /* Gradient */
  background-size: cover;
  background-position: center;
  color: white;
  padding: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${slideInFromRight} 0.7s ease-out;

  @media (max-width: 768px) {
    height: 150px; /* Reduced height on mobile */
    flex: none;
    display: block; /* Keep the image visible on mobile */
  }
`;

const FormSide = styled.div`
  flex: 1;
  background-color: #f7f7f7;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${slideInFromLeft} 0.7s ease-out;
  p {
    margin-top: 6px;
  }

  @media (max-width: 768px) {
    padding: 20px; /* Add some padding for better spacing */
    flex: none;
  }
`;

const Label = styled.label`
  display: block;
  margin: 15px 0 5px;
  font-size: 14px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #ff7e5f;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #feb47b;
  }
`;
