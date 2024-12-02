"use client";
import React, { useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { loadingContainer } from "@/components/refresh/PullToRefresh.css";

interface PullToRefreshProps {
  refreshData: () => Promise<any>;
}

const PullToRefresh = ({ refreshData }: PullToRefreshProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [startScroll, setStartScroll] = useState(0);

  const triggerVibration = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate(100);
    }
  };

  useEffect(() => {
    let startY = 0;
    let isPulling = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        startY = e.touches[0].pageY;
        setStartScroll(window.scrollY);
        isPulling = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPulling || isRefreshing) return;

      const currentY = e.touches[0].pageY;
      if (currentY - startY > 100) {
        setIsRefreshing(true);
      }
    };

    const handleTouchEnd = async () => {
      if (isRefreshing) {
        triggerVibration();
        await refreshData();
      }
      setIsRefreshing(false);
      window.scrollTo({ top: startScroll, behavior: "smooth" });
      isPulling = false;
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isRefreshing, refreshData, startScroll]);

  return (
    <>
      {isRefreshing ? (
        <div className={loadingContainer}>
          <DotLottieReact src="/animation/loading.lottie" autoplay loop />
        </div>
      ) : null}
    </>
  );
};

export default PullToRefresh;
