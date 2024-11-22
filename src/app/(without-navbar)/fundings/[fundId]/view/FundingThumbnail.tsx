import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import styled from "@emotion/styled";
import { CoverImage } from "@/components/image";
import { FundingDto } from "@/types/Funding";
import "swiper/css";
import "swiper/css/navigation";

interface Props {
  funding: FundingDto;
}

export default function FundingThumbnail({ funding }: Props) {
  const { fundImgUrls, fundTitle } = funding;

  return (
    <ThumbnailSwiper
      pagination={{ type: "fraction" }}
      modules={[Pagination]}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {fundImgUrls.map((img) => (
        <SwiperSlide key={img}>
          <CoverImage
            src={img ?? "/dummy/present.webp"}
            alt={`thumbnail-${fundTitle}`}
            parentDivStyle={{ height: "30vh" }}
          />
        </SwiperSlide>
      ))}
    </ThumbnailSwiper>
  );
}

const ThumbnailSwiper = styled(Swiper)`
  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-pagination {
    position: absolute;
    bottom: 15px;
    right: 15px;
    color: white;
    font-size: 14px;
    z-index: 10;
    background-color: rgba(128, 128, 128, 0.6);
    padding: 5px 10px;
    border-radius: 20px;
    border: none;
    max-width: 52px;
    margin-left: auto;
  }
`;
