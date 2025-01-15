import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { FieldErrors, useFormContext, useWatch } from "react-hook-form";
import GiftDto from "@/types/GiftDto";
import DragHandler from "@/components/dragndrop/DragHandler";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import axiosInstance from "@/utils/axios";
import { debounce } from "lodash";

interface GiftItemProps {
  id: string;
  index: number;
  gifts: GiftDto[];
  onDelete: () => void;
  primaryGiftId: string;
  setPrimaryGiftId: (id: string) => void;
}

export default function GiftItem({
  id,
  index,
  gifts,
  onDelete,
  primaryGiftId,
  setPrimaryGiftId,
}: GiftItemProps) {
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext();
  const giftUrl = useWatch({
    control,
    name: `gifts[${index}].giftUrl`,
  });

  const DUMMY: string = "/dummy/present.webp";
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  // 현재 대표 이미지 여부를 카드 id로 확인
  const isPrimary = primaryGiftId === id;

  const giftsErrors = errors.gifts as FieldErrors<GiftDto>[] | undefined;

  useEffect(() => {
    // url 지우면 기존에 있던 썸네일도 제거
    if (giftUrl === "") {
      setThumbnail(null);
      return;
    }

    const fetchMetadata = debounce(async (url) => {
      try {
        const response = await axiosInstance.post("/server/metadata", { url });
        setThumbnail(response.data.image || DUMMY);
        setValue(`gifts[${index}].giftImg`, response.data.image || null);

        // 첫 번째 아이템이고, 아직 다른 대표이미지가 설정되지 않았다면 대표이미지로 설정
        if (index === 0 && !primaryGiftId) {
          setPrimaryGiftId(id);
        }
      } catch (error) {
        console.error("메타데이터 fetch error", error);
        setThumbnail(DUMMY);
      }
    }, 500);

    if (giftUrl) fetchMetadata(giftUrl);
    return () => fetchMetadata.cancel();
  }, [giftUrl, setValue, index, id, primaryGiftId]);

  // 대표이미지 설정하는 함수
  const handleSetPrimary = () => {
    setPrimaryGiftId(id);
  };

  return (
    <Card
      sx={{
        borderRadius: 5,
        boxShadow: "5px 15px 15px rgba(0,0,0,0.05)",
        marginBottom: "10px",
      }}
    >
      <CardContent sx={{ paddingY: "4px" }}>
        <DragHandler gifts={gifts} id={id} onDelete={onDelete} />
        <Stack direction="row" spacing={2} alignItems="center">
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
                {/* 대표 이미지 지정 버튼 */}
                <IconButton
                  onClick={handleSetPrimary}
                  sx={{
                    position: "absolute",
                    top: -30,
                    right: -10,
                  }}
                >
                  {isPrimary ? (
                    <StarIcon
                      sx={{ color: "gold", width: "20px", height: "20px" }}
                    />
                  ) : (
                    <StarBorderIcon
                      sx={{ color: "gray", width: "20px", height: "20px" }}
                    />
                  )}
                </IconButton>

                <Box
                  component="img"
                  src={thumbnail}
                  sx={{
                    width: "100px",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                />
              </div>
            )}
          </Box>

          {/*입력폼*/}
          <Box>
            <TextField
              {...register(`gifts[${index}].giftUrl`, {
                required: "url을 첨부해주세요.",
              })}
              helperText={
                giftsErrors?.[index]?.giftUrl?.message?.toString() || ""
              }
              placeholder="url"
              size="small"
              fullWidth
              margin="dense"
              InputLabelProps={{ shrink: true }}
              sx={formStylesWithValidation}
            />
            <TextField
              {...register(`gifts[${index}].giftTitle`, {
                required: "제목을 입력해주세요.",
              })}
              helperText={
                giftsErrors?.[index]?.giftTitle?.message?.toString() || ""
              }
              placeholder="제목"
              size="small"
              fullWidth
              margin="dense"
              InputLabelProps={{ shrink: true }}
              sx={formStylesWithValidation}
            />
            <TextField
              {...register(`gifts[${index}].giftOpt`)}
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
              {...register(`gifts[${index}].giftCont`, {
                maxLength: {
                  value: 20,
                  message: "20자 이내로 입력해주세요.",
                },
              })}
              helperText={
                giftsErrors?.[index]?.giftCont?.message?.toString() || ""
              }
              placeholder="설명"
              size="small"
              fullWidth
              margin="dense"
              InputLabelProps={{ shrink: true }}
              sx={formStylesWithValidation}
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

const formStylesWithValidation = {
  borderRadius: 4,
  backgroundColor: "#ECF0EF",
  "& .MuiFormHelperText-root": {
    color: "#d32f2f",
    pb: "2px",
  },
};
