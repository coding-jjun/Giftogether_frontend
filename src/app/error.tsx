"use client";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  container,
  errorMessage,
  errorTitle,
  lottieWrapper,
  retryButton,
  wrapper,
} from "./error.css";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={container}>
      <div className={wrapper}>
        <div className={lottieWrapper}>
          <DotLottieReact src="/animation/warning.lottie" autoplay />
        </div>
        <h2 className={errorTitle}>문제가 발생했습니다!</h2>
        <p className={errorMessage}>
          [{error.name}] {error.message}
        </p>
        <button onClick={() => reset()} className={retryButton}>
          다시 시도하기
        </button>
      </div>
    </div>
  );
}
