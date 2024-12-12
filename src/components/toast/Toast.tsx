"use client";
import { useEffect } from "react";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

interface ToastProps {
  message: string;
  onClose: () => void;
}

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  width: 75vw;
  background-color: rgba(97, 90, 90, 0.6);
  backdrop-filter: blur(5px);
  color: #fff;
  padding: 12px 20px;
  border-radius: 30px;
  animation: ${slideUp} 0.5s ease-out forwards;
  text-align: center;
`;

export const Toast = ({ message, onClose }: ToastProps) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [onClose]);

  return <ToastContainer>{message}</ToastContainer>;
};
