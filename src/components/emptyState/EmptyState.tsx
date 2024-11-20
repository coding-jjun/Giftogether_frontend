import { Box, Typography } from "@mui/material";
import React from "react";

interface Props {
  icon: React.ReactNode;
  title: string;
  message?: string;
}

export default function EmptyState({ icon, title, message }: Props) {
  return (
    <Box
      sx={{
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        top: 0,
        left: 0,
        right: 0,
        bottom: 75,
        textAlign: "center",
        px: 2,
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box>
          {icon}
          <Typography variant="h6" sx={{ mt: 2 }}>
            {title}
          </Typography>
          <Typography sx={{ color: "#757575", mt: 1 }}>{message}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
