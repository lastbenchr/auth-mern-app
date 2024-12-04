import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import Courses from "../components/Courses";
import styled from "styled-components";
import Footer from "../components/Footer";

// protected component, only authenticated user can see this component.
function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Loggedout");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <HomeWrapper>
      <WelcomeText>
        <TextContainer>
          Welcome <Span>{loggedInUser} 😎</Span>
        </TextContainer>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </WelcomeText>

      <Courses />
      <ToastContainer />
      <Footer />
    </HomeWrapper>
  );
}

export default Home;

const HomeWrapper = styled.div`
  padding: 20px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const WelcomeText = styled.h1`
  font-size: clamp(
    1.8rem,
    5vw,
    2.5rem
  ); // Minimum 1.8rem, preferred size is 5vw, and maximum 3.2rem
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  flex-wrap: wrap;
`;

const Span = styled.span`
  margin-left: 5px;
`;

const LogoutButton = styled.button`
  background-color: #ff7e5f;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #feb47b;
  }
`;
