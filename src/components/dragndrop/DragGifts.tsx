import { useEffect, useId, useState } from "react";
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
import { v4 as uuidv4 } from "uuid";

import { DroppableGiftForm } from "@/components/dragndrop/DroppableGiftForm";
import AddGiftForm from "@/components/dragndrop/AddGiftForm";
import GiftItem from "@/components/dragndrop/GiftItem";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FundingForm } from "@/types/Funding";

interface DragEvent {
  active: Active;
  over: Over | null;
}

export default function DragGifts() {
  const { control, setValue } = useFormContext<FundingForm>();
  const { fields, append, remove, swap } = useFieldArray({
    name: "gifts",
    control,
  });

  const DndId = useId(); // 각 dndContext에 고유한 id를 할당하기 위한 훅
  const [active, setActive] = useState<Active | null>(null);
  const activeItem = fields.find(({ id }) => id === active?.id); // 현재 드래그 중인 기프트 항목

  // 대표이미지로 설정된 gift의 id 저장
  const [primaryGiftId, setPrimaryGiftId] = useState<string>("");

  // 컴포넌트 마운트 시 첫 번째 아이템을 대표이미지로 설정
  useEffect(() => {
    if (fields.length > 0 && !primaryGiftId) {
      setPrimaryGiftId(fields[0].id);
    }
  }, [fields]);

  // gifts 배열 변화 감지하여 대표이미지 업데이트
  useEffect(() => {
    const primaryGift = fields.find((gift) => gift.id === primaryGiftId);
    if (primaryGift?.giftImg) {
      setValue("fundImg", primaryGift.giftImg);
    }
  }, [fields, primaryGiftId, setValue]);

  // 대표이미지 설정 핸들러
  const handleSetPrimary = (id: string) => {
    setPrimaryGiftId(id);
  };

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // 새로운 기프트 카드 추가
  const handleAddForm = () => {
    if (fields.length >= 5) return; // 최대 5개까지만 추가 가능

    append({
      id: uuidv4(),
      giftOrd: fields.length + 1, // ord 1부터 시작
      giftImg: null,
      giftTitle: "",
      giftUrl: "",
    });
  };

  const handleDragStart = (event: DragEvent) => {
    setActive(event.active);
  };

  const handleDragCancel = () => {
    setActive(null);
  };

  // 드래그된 항목의 id와 드롭된 위치의 id를 비교한 후 gifts 배열의 순서 변경
  const handleDragEnd = (event: DragEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      setActive(null);
      return;
    }

    if (active.id !== over?.id) {
      const activeIndex = fields.findIndex(({ id }) => id === active.id);
      const overIndex = fields.findIndex(({ id }) => id === over.id);

      if (activeIndex !== -1 && overIndex !== -1) {
        swap(activeIndex, overIndex);
      }
    }
    setActive(null);
  };

  const handleDelete = (targetId: string) => {
    const targetIdx = fields.findIndex(({ id }) => id === targetId);
    if (targetIdx !== -1) {
      remove(targetIdx);
    }
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
          gifts={fields}
          onDelete={handleDelete}
          primaryGiftId={primaryGiftId}
          setPrimaryGiftId={handleSetPrimary}
        />
        <DragOverlay>
          {active?.id && activeItem ? (
            <GiftItem
              id={activeItem.id}
              index={fields.findIndex((field) => field.id === activeItem.id)}
              gifts={fields}
              onDelete={() => handleDelete(activeItem.id)}
              primaryGiftId={primaryGiftId}
              setPrimaryGiftId={handleSetPrimary}
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* 아이템 추가 - 5개 미만일 때만 표시 */}
      {fields.length < 5 && <AddGiftForm onSubmit={handleAddForm} />}
    </>
  );
}
