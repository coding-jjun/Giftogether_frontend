import { globalStyle, globalFontFace } from "@vanilla-extract/css";

globalFontFace("Pretendard", {
  src: 'url("/font/PretendardVariable.woff2") format("woff2")',
  fontWeight: "normal",
  fontStyle: "normal",
});

globalFontFace("Jalnan", {
  src: 'url("/font/Jalnan2TTF.ttf") format("truetype")',
  fontWeight: "normal",
  fontStyle: "normal",
});

globalStyle("html, body", {
  fontFamily: "Pretendard, sans-serif",
  margin: 0,
  padding: 0,
  boxSizing: "border-box",
});

globalStyle("*, *::before, *::after", {
  boxSizing: "inherit",
  margin: 0,
  padding: 0,
});

globalStyle("*, *::before, *::after", {
  boxSizing: "inherit",
  margin: 0,
  padding: 0,
});
