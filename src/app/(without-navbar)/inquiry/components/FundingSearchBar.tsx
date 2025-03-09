import { input } from "@/app/(without-navbar)/inquiry/page.css";
import CloseIcon from "@public/icons/Close.svg";
import Link from "next/link";
import SearchIcon from "@public/icons/Search.svg";
import useInquiryForm from "@/app/(without-navbar)/inquiry/hooks/useInquiryForm";
import {
  clearFundingButton,
  findFundingButton,
  fundingSearchBar,
} from "@/app/(without-navbar)/inquiry/components/FundingSearchBar.css";

export const FundingSearchBar = () => {
  const { inquiryForm, clearFunding } = useInquiryForm();

  return (
    <div className={fundingSearchBar}>
      <input
        className={input}
        type="text"
        disabled
        placeholder="선택된 관련 펀딩이 없습니다"
        value={inquiryForm.fundTitle || ""}
        style={{
          paddingRight: inquiryForm.fundTitle ? "40px" : "10px",
        }}
      />

      {inquiryForm.fundTitle && (
        <button onClick={clearFunding} className={clearFundingButton}>
          <CloseIcon widh={16} height={16} />
        </button>
      )}

      {/* 검색 버튼 */}
      <Link
        href={`/inquiry/related-funding?type=${inquiryForm.inquiryType}`}
        className={findFundingButton}
      >
        <SearchIcon />
      </Link>
    </div>
  );
};
