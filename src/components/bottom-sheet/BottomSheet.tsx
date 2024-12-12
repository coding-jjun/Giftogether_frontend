import * as S from "@/components/bottom-sheet/BottomSheetStyle";
import Header from "@/components/bottom-sheet/Header";
import { AnimationControls, PanInfo } from "framer-motion";
import { Overlay } from "@/components/bottom-sheet/BottomSheetStyle";
import { useEffect } from "react";

interface Props {
  isOpen: boolean;
  onDragEnd: (info: any) => void;
  controls: AnimationControls;
  closeBottomSheet: () => void;
  children: any;
}

export default function BottomSheet({
  isOpen,
  closeBottomSheet,
  onDragEnd,
  controls,
  children,
}: Props) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <Overlay onClick={closeBottomSheet} />
      <S.Wrapper
        drag="y"
        onDragEnd={onDragEnd}
        initial="hidden"
        animate={controls}
        transition={{
          type: "spring",
          damping: 40,
          stiffness: 400,
        }}
        variants={{
          visible: { y: 0 },
          hidden: { y: "100%" },
        }}
        dragConstraints={{ top: 0 }}
        dragElastic={0.2}
      >
        <Header />
        <S.ContentWrapper>{children}</S.ContentWrapper>
      </S.Wrapper>
    </>
  );
}
