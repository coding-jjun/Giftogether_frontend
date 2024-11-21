import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const useCookie = <T = string>(key: string): T | undefined => {
  const [cookieValue, setCookieValue] = useState<T | undefined>(undefined);

  useEffect(() => {
    const handleCookieChange = () => {
      const value = Cookies.get(key);
      if (value) {
        try {
          const parsedValue = JSON.parse(value) as T;
          setCookieValue(parsedValue);
        } catch (e) {
          setCookieValue(value as T);
        }
      }
    };

    handleCookieChange();

    window.addEventListener("focus", handleCookieChange);

    return () => window.removeEventListener("focus", handleCookieChange);
  }, [key]);

  return cookieValue;
};

export const getCookieValue = (cookieName: string) => {
  const matches = document.cookie.match(
    new RegExp("(^| )" + cookieName + "=([^;]+)"),
  );
  return matches ? decodeURIComponent(matches[2]) : null;
};
