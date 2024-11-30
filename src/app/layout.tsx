import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@mui/material";
import theme from "@/components/theme";
import { QueryClientProvider, RecoilRootProvider } from "@/components/provider";
import { OverlayProvider } from "@/components/overlay";
import { ToastProvider } from "@/components/toast";
import "@/styles/global.css";
import "./globals.css";

const pretendard = localFont({
  src: [
    {
      path: "../../public/font/PretendardVariable.woff2",
      weight: "45 920",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "기프투게더",
  description: "기프투게더",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={pretendard.className}
        style={{ overflowX: "hidden", margin: "0px" }}
      >
        <RecoilRootProvider>
          <ThemeProvider theme={theme}>
            <OverlayProvider>
              <ToastProvider>
                <QueryClientProvider>{children}</QueryClientProvider>
              </ToastProvider>
            </OverlayProvider>
          </ThemeProvider>
        </RecoilRootProvider>
      </body>
    </html>
  );
}
