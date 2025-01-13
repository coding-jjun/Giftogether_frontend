import GiftItem from "@/components/dragndrop/GiftItem";
import GiftDto from "@/types/GiftDto";

interface Props {
  id: string;
  index: number;
  gifts: GiftDto[];
  onDelete: () => void;
  primaryIndex: number | null;
  setPrimaryIndex: (index: number) => void;
}

export default function SortableGiftForm({
  id,
  index,
  gifts,
  onDelete,
  primaryIndex,
  setPrimaryIndex,
}: Props) {
  return (
    <GiftItem
      id={id}
      index={index}
      gifts={gifts}
      onDelete={onDelete}
      primaryIndex={primaryIndex}
      setPrimaryIndex={setPrimaryIndex}
    />
  );
}
