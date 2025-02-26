import { Grid, Typography } from "@mui/material";

export default function BoardItem() {
  return (
    <Grid spacing={2} sx={{ px: 1.5 }}>
      {/* TODO: 서버와 연결 필요 */}
      <Typography sx={{ backgroundColor: "#FFF6F6", p: 2, borderRadius: 4 }}>
        🔒 비밀글입니다.
      </Typography>
    </Grid>
  );
}
