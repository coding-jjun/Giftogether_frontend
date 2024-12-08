"use client";
import { ChangeEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Stack, TextField } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CoverImage from "@/components/image/CoverImage";
import { ActionBarButton } from "@/components/layout/action-bar/ActionBarButton";
import ActionBar from "@/components/layout/action-bar/ActionBar";
import useAddGratitude from "@/query/useAddGratitude";
import { GratitudeDto } from "@/types/Gratitude";
import useUploadImage from "@/hook/useUploadImage";
import LayoutWithPrev from "@/components/layout/layout-with-prev";

interface Params {
  fundId: string;
}

export default function GratitudeCreationPage({ params }: { params: Params }) {
  const router = useRouter();
  const { uploadImages } = useUploadImage();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const { mutate, isPending } = useAddGratitude(params.fundId);

  const onClickBox = () => {
    if (inputRef != null && inputRef.current != null) {
      inputRef.current!.click();
    }
  };

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const files: File[] = Array.from(event.target.files);

    if (files.length > 0) {
      setUploadedFiles((prev) => [...prev, ...files]);
    }

    const imageURLList: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.result && typeof reader.result === "string") {
          imageURLList.push(reader.result);
        }

        if (imageURLList.length === files.length) {
          setImageUrls((prev) => [...prev, ...imageURLList]);
        }
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = async () => {
    const urls = await uploadImages(uploadedFiles);
    const dto: GratitudeDto = {
      gratTitle: title,
      gratCont: content,
      gratImg: urls,
    };

    mutate(dto);

    router.push(`/fundings/${params.fundId}`);
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <LayoutWithPrev
      actionBar={
        <ActionBar>
          <ActionBarButton
            variant="contained"
            loading={isPending}
            onClick={handleSubmit}
          >
            등록하기
          </ActionBarButton>
        </ActionBar>
      }
    >
      <Stack
        sx={{
          width: "100%",
          margin: "auto",
          boxSizing: "border-box",
          padding: 2,
        }}
        spacing={1}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <Box
            sx={{
              height: "100px",
              aspectRatio: "1/1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
              bgcolor: "grey.300",
              "&:hover": {
                bgcolor: "grey.400",
              },
            }}
            onClick={onClickBox}
          >
            <CameraAltIcon />
          </Box>
          <input
            ref={inputRef}
            type="file"
            hidden
            multiple
            onChange={onChangeFile}
          />
          <Stack
            direction="row"
            spacing={1}
            sx={{
              flexGrow: 1,
              overflowX: "auto",
              whiteSpace: "nowrap",
            }}
          >
            {imageUrls.map((url, index) => (
              <CoverImage
                key={url}
                src={url}
                alt={`uploaded_file_${index}`}
                parentDivStyle={{ flex: "0 0 auto", width: "100px" }}
              />
            ))}
          </Stack>
        </div>
        <TextField
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={handleChangeTitle}
        />
        <TextField
          placeholder="감사인사를 작성해주세요."
          fullWidth
          multiline
          minRows={15}
          value={content}
          onChange={handleChangeContent}
        />
      </Stack>
    </LayoutWithPrev>
  );
}
