import { useState } from "react";
import { Button, Grid } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import DragGifts from "@/components/dragndrop/DragGifts";
import { FundingForm } from "@/types/Funding";
import { useFormContext } from "react-hook-form";

export default function GiftComponent() {
  const [showItems, setShowItems] = useState<boolean>(true);
  const { register } = useFormContext<FundingForm>();

  const toggleGifts = () => {
    setShowItems(!showItems);
  };

  register("fundImg");

  return (
    <Grid item xs={12}>
      <Button
        startIcon={showItems ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        onClick={toggleGifts}
        sx={{
          color: "#F6B70B",
          fontWeight: "bold",
        }}
      >
        ITEMS
      </Button>
      <div style={{ display: showItems ? "block" : "none" }}>
        <DragGifts />
      </div>
    </Grid>
  );
}
