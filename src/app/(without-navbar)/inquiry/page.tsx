"use client";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import LayoutWithPrev from "@/components/layout/layout-with-prev";
import useAddInquiry from "@/query/useAddInquiry";
import { InquiryRequest, InquiryType } from "@/types/Inquiry";
import Select from "@/components/select";
import {
  container,
  formContainer,
  input,
  textarea,
} from "@/app/(without-navbar)/inquiry/page.css";
import { useToast } from "@/components/toast";
import { actionButton } from "@/components/layout/layout-with-prev/layout.css";
import { FundingSearchBar } from "@/app/(without-navbar)/inquiry/components/FundingSearchBar";
import useInquiryForm from "@/app/(without-navbar)/inquiry/hooks/useInquiryForm";
import SegmentedControl from "@/components/button/SegmentedControl";

interface FormData {
  inquiryType?: InquiryType;
  title: string;
  content: string;
  isPublic: boolean;
}

const inquiryTypeOptions = [
  { value: "payment", label: "결제 문의" },
  { value: "shipping", label: "배송 문의" },
  { value: "funding", label: "펀딩 문의" },
  { value: "etc", label: "기타 문의" },
];

export default function InquiryPage() {
  const { addToast } = useToast();
  const { inquiryForm, updateInquiryForm, clearFunding } = useInquiryForm(); // ✅ Recoil 상태 활용

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: inquiryForm,
  });

  useEffect(() => {
    setValue("inquiryType", inquiryForm.inquiryType);
    setValue("title", inquiryForm.title);
    setValue("content", inquiryForm.content);
    setValue("isPublic", inquiryForm.isPublic);
  }, [inquiryForm, setValue]);

  const { mutate: addInquiry, isPending } = useAddInquiry();

  const onSubmit = (data: FormData) => {
    const inquiryRequest: InquiryRequest = {
      ...data,
      fundUuid: inquiryForm.fundUuid || null,
    };

    addInquiry(inquiryRequest, {
      onSuccess: () => {
        addToast("문의가 등록되었습니다.");
        reset();
        clearFunding();
      },
      onError: () => {
        addToast("문의 등록에 실패했습니다.");
      },
    });
  };

  return (
    <LayoutWithPrev
      title="문의하기"
      actionBar={
        <button
          className={actionButton}
          onClick={handleSubmit(onSubmit)}
          disabled={isPending}
        >
          {isPending ? "등록 중..." : "문의하기"}
        </button>
      }
    >
      <div className={container}>
        <Controller
          control={control}
          name="inquiryType"
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              options={inquiryTypeOptions}
              value={inquiryTypeOptions.find(
                (opt) => opt.value === field.value,
              )}
              onChange={(option) => {
                updateInquiryForm("inquiryType", option.value);
                field.onChange(option.value);
              }}
              placeholder="문의타입"
              hasError={!!errors.inquiryType}
            />
          )}
        />

        <div className={formContainer}>
          <Controller
            control={control}
            name="title"
            rules={{ required: true }}
            render={({ field }) => (
              <input
                {...field}
                className={`${input} ${!!errors.title ? "error" : ""}`}
                type="text"
                placeholder="제목을 입력해 주세요"
                onChange={(e) => {
                  updateInquiryForm("title", e.target.value);
                  field.onChange(e.target.value);
                }}
              />
            )}
          />

          <Controller
            control={control}
            name="content"
            rules={{ required: true }}
            render={({ field }) => (
              <textarea
                {...field}
                className={`${textarea} ${!!errors.content ? "error" : ""}`}
                placeholder="내용을 입력해 주세요"
                onChange={(e) => {
                  updateInquiryForm("content", e.target.value);
                  field.onChange(e.target.value);
                }}
              />
            )}
          />
        </div>

        <Controller
          control={control}
          name="isPublic"
          render={({ field }) => (
            <SegmentedControl
              value={field.value}
              options={[
                { label: "공개", value: true },
                { label: "비공개", value: false },
              ]}
              onChange={(value) => {
                updateInquiryForm("isPublic", value);
                field.onChange(value);
              }}
            />
          )}
        />

        {!!inquiryForm.inquiryType && inquiryForm.inquiryType !== "etc" && (
          <FundingSearchBar />
        )}
      </div>
    </LayoutWithPrev>
  );
}
