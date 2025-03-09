"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { inquiryState } from "@/store/atoms/inquiry";
import LayoutWithPrev from "@/components/layout/layout-with-prev";
import FundingCard from "@/app/(without-navbar)/inquiry/components/FundingCard";
import useRelatedFundingQuery from "@/query/useRelatedFundingQuery";
import { actionButton } from "@/components/layout/layout-with-prev/layout.css";
import { relatedFundingContainer } from "@/app/(without-navbar)/inquiry/related-funding/page.css";

export const dynamic = "force-dynamic";

export default function RelatedFundingPage() {
  return (
    <Suspense>
      <RelatedFunding />
    </Suspense>
  );
}

function RelatedFunding() {
  const router = useRouter();
  const setInquiryForm = useSetRecoilState(inquiryState);

  const searchParams = useSearchParams();
  const queryType = searchParams.get("type");
  const { fundings } = useRelatedFundingQuery(queryType);

  const [selectedFundingId, setSelectedFundingId] = useState<string>();
  const [selectedFundingTitle, setSelectedFundingTitle] = useState<string>();

  const handleSelectFunding = (id: string, title: string) => {
    setSelectedFundingId((prev) => (prev === id ? undefined : id));
    setSelectedFundingTitle((prev) => (prev === title ? undefined : title));
  };

  const handleSubmitFunding = () => {
    if (!selectedFundingId) return;

    setInquiryForm((prev) => ({
      ...prev,
      fundUuid: selectedFundingId,
      fundTitle: selectedFundingTitle,
    }));
    router.push(`/inquiry`);
  };

  return (
    <Suspense>
      <LayoutWithPrev
        title="관련 펀딩 선택하기"
        actionBar={
          <button className={actionButton} onClick={handleSubmitFunding}>
            선택하기
          </button>
        }
      >
        <div
          className={relatedFundingContainer({
            variant: fundings.length ? undefined : "empty",
          })}
        >
          {fundings.length ? (
            fundings.map((card) => (
              <FundingCard
                key={card.id}
                id={card.id}
                thumbnail={card.thumbnail}
                nickname={card.nickname || ""}
                title={card.title}
                selected={selectedFundingId === card.id}
                onSelect={handleSelectFunding}
              />
            ))
          ) : (
            <span>관련 펀딩이 없습니다.</span>
          )}
        </div>
      </LayoutWithPrev>
    </Suspense>
  );
}
