import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function NotFound() {
  return (
    <NotFoundContainer>
      <Header>404</Header>
      <Message>Page Not Found</Message>
      <StyledLink to="/">Go Back to Home</StyledLink>
    </NotFoundContainer>
  );
}

export default NotFound;

const NotFoundContainer = styled.div`
  text-align: center;
  margin-top: 100px;
  font-family: Arial, sans-serif;
`;

const Header = styled.h1`
  font-size: 72px;
  color: #ff6b6b;
`;

const Message = styled.p`
  font-size: 24px;
  color: #555;
`;

const StyledLink = styled(Link)`
  margin-top: 20px;
  display: inline-block;
  text-decoration: none;
  color: #007bff;
  font-size: 18px;

  &:hover {
    text-decoration: underline;
  }
`;
