import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Giftogether",
    short_name: "Giftogether",
    description: "Giftogether",
    theme_color: "#f5f5f5",
    background_color: "#f5f5f5",
    icons: [
      {
        src: "app-icon/ios/192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "app-icon/ios/512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "app-icon/ios/192.png",
        sizes: "192x192",
        purpose: "maskable",
        type: "image/png",
      },
      {
        src: "app-icon/ios/512.png",
        sizes: "512x512",
        purpose: "maskable",
        type: "image/png",
      },
    ],
    orientation: "any",
    display: "standalone",
    dir: "auto",
    lang: "ko-KR",
    start_url: "/",
  };
}
