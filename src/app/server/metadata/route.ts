import { NextRequest, NextResponse, userAgent } from "next/server";
import puppeteer from "puppeteer";

export async function POST(request: NextRequest) {
  const { url } = await request.json();

  if (!url) {
    return NextResponse.json({ error: "URL을 입력해주세요." }, { status: 400 });
  }

  try {
    // Puppeteer 브라우저 실행
    const browser = await puppeteer.launch({
      headless: true, // 최신 Headless 모드
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // 서버 환경에서 안정적으로 실행
    });
    const page = await browser.newPage();

    // 사용자가 접속한 기기 정보
    const { ua } = userAgent(request);
    const clientUserAgent =
      ua ||
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36";

    // User-Agent 설정
    await page.setUserAgent(clientUserAgent);

    // 페이지 이동
    await page.goto(url, { waitUntil: "domcontentloaded" });

    // 메타데이터 추출
    const metadata = await page.evaluate(() => {
      const getMetaTagContent = (property: string) =>
        document
          .querySelector(`meta[property="${property}"]`)
          ?.getAttribute("content") ||
        document
          .querySelector(`meta[name="${property}"]`)
          ?.getAttribute("content");

      return {
        title: getMetaTagContent("og:title") || document.title,
        description:
          getMetaTagContent("og:description") ||
          getMetaTagContent("description"),
        image:
          getMetaTagContent("og:image") || getMetaTagContent("twitter:image"),
      };
    });

    // Puppeteer 브라우저 종료
    await browser.close();

    return NextResponse.json(metadata);
  } catch (error) {
    console.error("❌ 메타데이터 추출 중 에러:", error);
    return NextResponse.json(
      { error: "메타데이터를 불러오는데 실패했어요." },
      { status: 500 }
    );
  }
}
