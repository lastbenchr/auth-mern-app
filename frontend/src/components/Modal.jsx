import React from "react";
import styled from "styled-components";

const Modal = ({ show, onClose, children }) => {
  if (!show) return null; // Don't render if modal is not open

  return (
    <Overlay>
      <ModalContainer>{children}</ModalContainer>
    </Overlay>
  );
};

export default Modal;

// Styled Components
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 95%;
  }
`;
