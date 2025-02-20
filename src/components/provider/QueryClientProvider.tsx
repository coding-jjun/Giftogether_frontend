"use client";
import { ReactNode } from "react";
import { QueryClientProvider as ReactQueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/utils/react-query";

interface Props {
  children: ReactNode;
}

export default function QueryClientProvider({ children }: Props) {
  const queryClient = getQueryClient();

  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
}
