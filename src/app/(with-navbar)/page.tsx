"use client";
import dynamic from "next/dynamic";
import MainPageSkeleton from "@/app/(with-navbar)/page.skeleton";
import { useEffect } from "react";

const MainPageContent = dynamic(
  () => import("@/app/(with-navbar)/page.suspense"),
  {
    ssr: false,
    loading: () => <MainPageSkeleton />,
  },
);

export default function Home() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {})
        .catch((err) =>
          console.error("Service Worker registration failed: ", err),
        );
    }
  }, []);

  return (
    <main>
      <MainPageContent />
    </main>
  );
}
