"use client";
import React from "react";
import ArrowBackIcon from "@public/icons/ArrowBackIos.svg";
import { header, icon, iconBtn, titleSpan } from "./layout.css";
import { useRouter } from "next/navigation";
import MoreVertIcon from "@public/icons/MoreVert.svg";

interface Props {
  title?: string;
  showMoreIcon?: boolean;
  onClickMore?: (e: React.MouseEvent<HTMLElement>) => void;
}

export const Header = ({ title, showMoreIcon, onClickMore }: Props) => {
  const router = useRouter();
  return (
    <div className={header}>
      <button onClick={() => router.back()} className={iconBtn}>
        <ArrowBackIcon className={icon} />
      </button>
      {title && <span className={titleSpan}>{title}</span>}
      {showMoreIcon && onClickMore && (
        <button className={iconBtn} onClick={onClickMore}>
          <MoreVertIcon className={icon} />
        </button>
      )}
    </div>
  );
};
