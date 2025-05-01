import React, { useState } from "react";
import Image from "next/image";
import * as styles from "./FundingCard.css";

export interface FundingCardProps {
  id: string;
  thumbnail?: string;
  nickname: string;
  title: string;
  selected: boolean;
  onSelect: (id: string, title: string) => void;
}

const FundingCard = ({
  id,
  thumbnail,
  nickname,
  title,
  selected,
  onSelect,
}: FundingCardProps) => {
  const [thumbnailImg, setThumbnailImg] = useState<string>(
    thumbnail || "/dummy/fallback.webp",
  );

  return (
    <div
      className={`${styles.cardContainer} ${selected ? styles.selectedCard : ""}`}
      onClick={() => onSelect(id, title)}
    >
      {/* 썸네일 이미지 */}
      <Image
        src={thumbnailImg}
        alt={`${title} Thumbnail`}
        width={60}
        height={60}
        className={styles.thumbnail}
        onError={() => setThumbnailImg("/dummy/fallback.webp")}
      />

      {/* 펀딩 개설자 + 펀딩 제목 */}
      <div className={styles.content}>
        <div className={styles.nickname}>{nickname}</div>
        <div className={styles.title}>{title}</div>
      </div>
    </div>
  );
};

export default FundingCard;
