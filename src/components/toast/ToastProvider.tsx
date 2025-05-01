"use client";
import React, { createContext, useState, useCallback, ReactNode } from "react";
import styled from "@emotion/styled";
import { Toast } from "@/components/toast";

interface ToastContextProps {
  addToast: (message: string) => void;
}

export const ToastContext = createContext<ToastContextProps | undefined>(
  undefined,
);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);

  const addToast = useCallback((message: string) => {
    const newToast = { id: Date.now(), message };
    setToasts((prevToasts) => [...prevToasts, newToast]);

    setTimeout(() => {
      setToasts((prevToasts) =>
        prevToasts.filter((toast) => toast.id !== newToast.id),
      );
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastWrapper>
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} onClose={() => {}} />
        ))}
      </ToastWrapper>
    </ToastContext.Provider>
  );
};

const ToastWrapper = styled.div`
  position: fixed;
  width: 100%;
  bottom: 110px;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
