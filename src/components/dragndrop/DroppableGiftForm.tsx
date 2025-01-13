import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableGiftForm from "@/components/dragndrop/SortableGiftForm";

import GiftDto from "@/types/GiftDto";

interface Prop {
  gifts: GiftDto[];
  onDelete: (id: string) => void;
  primaryIndex: number | null;
  setPrimaryIndex: (index: number) => void;
}

export function DroppableGiftForm({
  gifts,
  onDelete,
  primaryIndex,
  setPrimaryIndex,
}: Prop) {
  return (
    <SortableContext items={gifts} strategy={verticalListSortingStrategy}>
      {gifts.map((gift, index) => (
        <SortableGiftForm
          primaryIndex={primaryIndex}
          setPrimaryIndex={setPrimaryIndex}
          key={gift.id}
          id={gift.id}
          giftOrd={index}
          gifts={gifts}
          onDelete={() => onDelete(gift.id)}
        />
      ))}
    </SortableContext>
  );
}
