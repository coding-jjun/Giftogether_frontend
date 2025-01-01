import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, IconButton, TextField } from "@mui/material";
import { FieldErrors, useFormContext, useWatch } from "react-hook-form";
import GiftDto from "@/types/GiftDto";
import DragHandler from "@/components/dragndrop/DragHandler";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import axiosInstance from "@/utils/axios";

interface GiftItemProps {
  id: number;
  index: number;
  gifts: GiftDto[];
  onDelete: () => void;
  primaryIndex: number | null;
  setPrimaryIndex: (index: number) => void;
}

interface MetadataResponse {
  title?: string;
  description?: string;
  image?: string;
}

export default function GiftItem({
  id,
  index,
  gifts,
  onDelete,
  primaryIndex,
  setPrimaryIndex,
}: GiftItemProps) {
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext();
  const giftUrl = useWatch({
    control,
    name: `gifts[${index - 1}].giftUrl`,
  });

  const DUMMY: string = "/dummy/present.webp";

  const [thumbnail, setThumbnail] = useState<string | null>(null);

  // 현재 대표 이미지 여부를 primaryIndex로 확인
  const isPrimary = primaryIndex === index;

  const giftsErrors = errors.gifts as FieldErrors<GiftDto>[] | undefined;

  useEffect(() => {
    // url 지우면 기존에 있던 썸네일도 제거
    if (giftUrl === "") {
      setThumbnail(null);
      return;
    }

    if (giftUrl) {
      const fetchMetadata = async () => {
        try {
          const response = await axiosInstance.post<MetadataResponse>(
            "/server/metadata",
            {
              url: giftUrl,
            },
          );
          const imageUrl = response.data.image || null;
          setThumbnail(response.data.image || DUMMY);
          setValue(`gifts[${index - 1}].giftImg`, imageUrl);
        } catch (error) {
          console.error("metadata를 불러오는데 실패했어요.", error);
          setThumbnail(DUMMY);
          setValue(`gifts[${index - 1}].giftImg`, null);
        }
      };

      fetchMetadata();
    }
  }, [giftUrl, setValue]);

  // 대표이미지 설정하는 함수
  const handleSetPrimary = () => {
    setPrimaryIndex(index); // 부모의 primaryIndex 업데이트
    setValue(`gifts[${index - 1}].isPrimary`, !isPrimary);
  };

  return (
    <Card
      sx={{
        borderRadius: 5,
        boxShadow: "5px 15px 15px rgba(0,0,0,0.05)",
        marginBottom: "15px",
      }}
    >
      <CardContent>
        <DragHandler gifts={gifts} id={id} onDelete={onDelete} />

        {/*썸네일*/}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            position: "relative",
          }}
        >
          {thumbnail && (
            <div>
              <Box
                component="img"
                src={thumbnail}
                sx={{
                  width: "100%",
                  height: "auto",
                  marginTop: 2,
                  borderRadius: 2,
                }}
              />

              {/*대표 이미지 지정*/}
              <IconButton
                onClick={handleSetPrimary}
                sx={{
                  position: "absolute",
                  top: 30,
                  right: 10,
                  zIndex: 10,
                  backgroundColor: "white",
                  borderRadius: "50%",
                  boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
                }}
              >
                {isPrimary ? (
                  <StarIcon sx={{ color: "gold" }} />
                ) : (
                  <StarBorderIcon sx={{ color: "gray" }} />
                )}
              </IconButton>
            </div>
          )}
        </Box>

        {/*입력폼*/}
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            {...register(`gifts[${index - 1}].giftUrl`, {
              required: "url을 첨부해주세요.",
            })}
            helperText={
              giftsErrors?.[index - 1]?.giftUrl?.message?.toString() || ""
            }
            placeholder="url"
            size="small"
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
            sx={{
              borderRadius: 4,
              backgroundColor: "#ECF0EF",
              "& .MuiFormHelperText-root": {
                color: "#d32f2f",
                pb: "2px",
              },
            }}
          />
          <TextField
            {...register(`gifts[${index - 1}].giftTitle`, {
              required: "제목을 입력해주세요.",
            })}
            helperText={
              giftsErrors?.[index - 1]?.giftTitle?.message?.toString() || ""
            }
            placeholder="제목"
            size="small"
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
            sx={{
              borderRadius: 4,
              backgroundColor: "#ECF0EF",
              "& .MuiFormHelperText-root": {
                color: "#d32f2f",
                pb: "2px",
              },
            }}
          />
          <TextField
            {...register(`gifts[${index - 1}].giftOpt`)}
            placeholder="옵션"
            size="small"
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
            sx={{
              borderRadius: 4,
              backgroundColor: "#ECF0EF",
            }}
          />
          <TextField
            {...register(`gifts[${index - 1}].giftCont`, {
              maxLength: {
                value: 20,
                message: "20자 이내로 입력해주세요.",
              },
            })}
            helperText={
              giftsErrors?.[index - 1]?.giftCont?.message?.toString() || ""
            }
            placeholder="설명"
            size="small"
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
            sx={{
              borderRadius: 4,
              backgroundColor: "#ECF0EF",
              "& .MuiFormHelperText-root": {
                color: "#d32f2f",
                pb: "2px",
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
