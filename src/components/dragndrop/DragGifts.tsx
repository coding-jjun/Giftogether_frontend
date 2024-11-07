import React, { useEffect, useId, useMemo, useState } from "react";

import {
  DndContext,
  useSensor,
  useSensors,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  Active,
  Over,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import { DroppableGiftForm } from "@/components/dragndrop/DroppableGiftForm";
import { arrayMove } from "@/utils/giftArray";
import AddGiftForm from "@/components/dragndrop/AddGiftForm";

import GiftDto from "@/types/GiftDto";
import GiftItem from "@/components/dragndrop/GiftItem";

interface Props {
  gifts: GiftDto[];
  setGifts: (updateFunction: (currentGifts: GiftDto[]) => GiftDto[]) => void;
}

interface DragEvent {
  active: Active;
  over: Over | null;
}

export default function DragGifts({ gifts, setGifts }: Props) {
  const DndId = useId(); // 각 dndContext에 고유한 id를 할당하기 위한 훅
  const [active, setActive] = useState<Active | null>(null);
  // 현재 드래그 중인 기프트 항목 추적
  const activeItem = useMemo(
    () => gifts.find((gift) => gift.id === active?.id),
    [active, gifts],
  );
  const [primaryIndex, setPrimaryIndex] = useState<number | null>(null);

  const handleSetPrimary = (index: number) => {
    setPrimaryIndex(index);
  };

  useEffect(() => {
    console.log("gifts: ", gifts);
  }, [gifts]);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // 새로운 기프트 카드 추가
  const handleAddForm = () => {
    setGifts((currentGifts) => {
      const sortedGifts = [...currentGifts].sort((a, b) => b.id - a.id);
      const newId = currentGifts.length > 0 ? sortedGifts[0].id + 1 : 0;

      return [
        ...currentGifts,
        {
          id: newId,
          giftOrd: currentGifts.length + 1,
          giftImg: null,
          giftTitle: "",
          giftUrl: "",
        },
      ];
    });
  };

  const handleDragStart = (event: DragEvent) => {
    setActive(event.active);
  };

  const handleDragCancel = () => {
    setActive(null);
  };

  // 드래그된 항목의 id와 드롭된 위치의 id를 비교한 후 gifts 배열의 순서 변경
  // 순서를 변경한 후 giftOrd 다시 업데이트
  const handleDragEnd = (event: DragEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      setActive(null);
      return;
    }

    if (active.id !== over?.id) {
      const activeIndex = gifts.findIndex(({ id }) => id === active.id);
      const overIndex = gifts.findIndex(({ id }) => id === over.id);

      if (activeIndex !== -1 && overIndex !== -1) {
        setGifts((prevGifts) => {
          const newGifts = arrayMove(prevGifts, activeIndex, overIndex); // 순서 바꾼 new 배열

          // 입력폼 & giftOrd 변경
          return newGifts.map((gift, index) => ({
            ...gift,
            giftOrd: index + 1,
          }));
        });
      }
    }
    setActive(null);
  };

  // 기프트 삭제 후, 나머지 기프트 항목들의 giftOrd 재정렬
  const deleteGift = (targetId: number) => {
    const targetIdx = gifts.findIndex((gift) => gift.id === targetId);

    setGifts((prevGifts) =>
      prevGifts
        // 배열을 순회하며 targetId 제거 후 새로운 배열 반환
        .filter((gift) => gift.id !== targetId)
        .map((gift, idx) => {
          // targetIdx 이후 항목들만 ord 재정렬
          if (idx >= targetIdx) {
            return {
              ...gift,
              giftOrd: idx + 1,
            };
          }
          // targetIdx 이전 항목은 ord 유지
          return gift;
        }),
    );
  };

  return (
    <>
      <DndContext
        id={DndId}
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        onDragEnd={handleDragEnd}
      >
        <DroppableGiftForm
          gifts={gifts}
          onDelete={(id) => deleteGift(id)}
          primaryIndex={primaryIndex}
          setPrimaryIndex={handleSetPrimary}
        />
        <DragOverlay>
          {activeItem ? (
            <GiftItem
              id={activeItem.id}
              index={activeItem.id}
              gifts={gifts}
              onDelete={() => {
                const targetGift = gifts.find((gift) => gift.id === active?.id);
                if (targetGift) {
                  deleteGift(targetGift.id);
                }
              }}
              primaryIndex={primaryIndex}
              setPrimaryIndex={handleSetPrimary}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
      <AddGiftForm onSubmit={handleAddForm} />
    </>
  );
}
