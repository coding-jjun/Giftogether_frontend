import React, { ReactNode } from "react";
import { content, footer } from "./layout.css";
import { Header } from "./Header";

interface Props {
  children: ReactNode;
  title?: string;
  showMoreIcon?: boolean;
  onClickMore?: (e: React.MouseEvent<HTMLElement>) => void;
  actionBar?: ReactNode;
}
export default function LayoutWithPrev({
  children,
  title,
  showMoreIcon,
  onClickMore,
  actionBar,
}: Props) {
  return (
    <>
      <Header
        title={title}
        showMoreIcon={showMoreIcon}
        onClickMore={onClickMore}
      />
      <div className={content}>{children}</div>
      {actionBar && <div className={footer}>{actionBar}</div>}
    </>
  );
}
