"use client";
import React, { useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { loadingContainer } from "@/components/refresh/PullToRefresh.css";

interface PullToRefreshProps {
  refreshData: () => Promise<any>;
}

const PullToRefresh = ({ refreshData }: PullToRefreshProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const [startY, setStartY] = useState(0);

  const triggerVibration = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate(100);
    }
  };

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        setStartY(e.touches[0].pageY);
        setIsPulling(true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPulling || isRefreshing) return;

      const currentY = e.touches[0].pageY;
      if (currentY - startY > 100) {
        e.preventDefault();
        setIsRefreshing(true);
      }
    };

    const handleTouchEnd = async () => {
      if (isRefreshing) {
        triggerVibration();
        await refreshData();
      }
      setIsRefreshing(false);
      setIsPulling(false);
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isPulling, isRefreshing, startY, refreshData]);

  return (
    <>
      {isRefreshing && (
        <div className={loadingContainer}>
          <DotLottieReact src="/animation/loading.lottie" autoplay loop />
        </div>
      )}
    </>
  );
};

export default PullToRefresh;
