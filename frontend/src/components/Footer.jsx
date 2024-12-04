import React from "react";
import { styled } from "styled-components";

export default function Footer() {
  return (
    <Copyright>
      <p>© 2024 Copyright Sooraj Yadav | lastbenchr. </p>
    </Copyright>
  );
}

const Copyright = styled.div`
  margin-top: 3rem;
  p {
    text-align: center;
    font-size: 12px;
  }
`;
