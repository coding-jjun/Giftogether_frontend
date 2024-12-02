import { TypographyOptions } from "@mui/material/styles/createTypography";
import { Palette } from "@mui/material/styles/createPalette";
import { grey } from "@mui/material/colors";

const typography:
  | TypographyOptions
  | ((palette: Palette) => TypographyOptions) = {
  fontFamily: `var(--font-pretendard)`,
  h1: {
    color: grey[800],
  },
  h2: {
    color: grey[800],
  },
  h3: {
    color: grey[800],
  },
  h4: {
    color: grey[800],
  },
  h5: {
    color: grey[800],
  },
  h6: {
    color: grey[800],
  },
  subtitle1: {
    color: grey[800],
  },
  subtitle2: {
    color: grey[800],
  },
  body1: {
    color: grey[800],
  },
  body2: {
    color: grey[800],
  },
  caption: {
    color: grey[800],
  },
  overline: {
    color: grey[800],
  },
};

export default typography;
