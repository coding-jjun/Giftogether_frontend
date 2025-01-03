import { NextRequest, NextResponse, userAgent } from "next/server";
import { JSDOM } from "jsdom";
import axiosInstance from "@/utils/axios";

export async function POST(request: NextRequest) {
  const { url } = await request.json();

  if (!url) {
    return NextResponse.json({ error: "URL을 입력해주세요." }, { status: 400 });
  }

  // 사용자가 접속한 기기 정보 가져옴 (User-Agent)
  const { ua } = userAgent(request);
  const clientUserAgent =
    ua ||
    "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1";

  try {
    // url 인코딩
    const encodedUrl = encodeURIComponent(url);

    // 최종 url 여부 확인
    const getFinalUrl = async (initialUrl: string) => {
      try {
        // 쿠팡 url 리다이렉트 확인 생략
        if (initialUrl.includes("coupang.com")) {
          return initialUrl;
        }

        // 최초 HEAD 요청으로 리다이렉트 여부 확인
        const response = await axiosInstance.head(initialUrl, {
          maxRedirects: 0, // 리다이렉트 발생 시 catch로 이동
          validateStatus: (status) =>
            (status >= 200 && status < 400) || (status >= 300 && status < 400),
        });

        return initialUrl; // 리다이렉트가 발생하지 않는 경우 초기 url 반환
      } catch (error) {
        const axiosError = error as any;

        // 리다이렉트가 발생한 경우, get 요청으로 최종 url 확인
        if (
          axiosError.response &&
          axiosError.response.status >= 300 &&
          axiosError.response.status < 400
        ) {
          const redirectResponse = await axiosInstance.get(initialUrl, {
            maxRedirects: 10, // 리다이렉트 최대 10회까지 추적
            validateStatus: (status) => status >= 200 && status < 400,
          });
          return redirectResponse.request.res.responseUrl;
        }

        // 리다이렉트가 아닌 에러의 경우 예외 처리
        throw error;
      }
    };

    const finalUrl = await getFinalUrl(decodeURIComponent(encodedUrl));

    const response = await fetch(finalUrl, {
      method: "GET",
      headers: {
        "User-Agent": clientUserAgent,
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        Connection: "keep-alive",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `메타데이터 fetch 실패, status code: ${response.status}` },
        { status: 500 },
      );
    }

    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const metadata = {
      title:
        document
          .querySelector('meta[property="og:title"]')
          ?.getAttribute("content") ||
        document.querySelector("title")?.textContent,
      description:
        document
          .querySelector('meta[property="og:description"]')
          ?.getAttribute("content") ||
        document
          .querySelector('meta[name="description"]')
          ?.getAttribute("content"),
      image:
        document
          .querySelector('meta[property="og:image"]')
          ?.getAttribute("content") ||
        document
          .querySelector('meta[name="twitter:image"]')
          ?.getAttribute("content"),
    };
    return NextResponse.json(metadata);
  } catch (error) {
    console.error("❌메타데이터 fetch 중 에러:", error);
    return NextResponse.json(
      { error: "메타데이터를 불러오는데 실패했어요." },
      { status: 500 },
    );
  }
}
