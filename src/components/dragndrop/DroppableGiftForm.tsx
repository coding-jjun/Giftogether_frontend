import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableGiftForm from "@/components/dragndrop/SortableGiftForm";
import GiftDto from "@/types/GiftDto";

interface Prop {
  gifts: GiftDto[];
  onDelete: (id: string) => void;
  primaryGiftId: string;
  setPrimaryGiftId: (id: string) => void;
}

export function DroppableGiftForm({
  gifts,
  onDelete,
  primaryGiftId,
  setPrimaryGiftId,
}: Prop) {
  return (
    <SortableContext items={gifts} strategy={verticalListSortingStrategy}>
      {gifts.map((gift, index) => (
        <SortableGiftForm
          key={gift.id}
          id={gift.id}
          gifts={gifts}
          index={index}
          onDelete={() => onDelete(gift.id)}
          primaryGiftId={primaryGiftId}
          setPrimaryGiftId={setPrimaryGiftId}
        />
      ))}
    </SortableContext>
  );
}
