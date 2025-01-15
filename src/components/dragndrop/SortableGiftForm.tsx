import GiftItem from "@/components/dragndrop/GiftItem";
import GiftDto from "@/types/GiftDto";

interface Props {
  id: string;
  index: number;
  gifts: GiftDto[];
  onDelete: () => void;
  primaryGiftId: string;
  setPrimaryGiftId: (id: string) => void;
}

export default function SortableGiftForm({
  id,
  index,
  gifts,
  onDelete,
  primaryGiftId,
  setPrimaryGiftId,
}: Props) {
  return (
    <GiftItem
      id={id}
      index={index}
      gifts={gifts}
      onDelete={onDelete}
      primaryGiftId={primaryGiftId}
      setPrimaryGiftId={setPrimaryGiftId}
    />
  );
}
