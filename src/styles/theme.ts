// theme.ts
import { mixins } from "./mixins";
import { createTheme } from "@mui/material";

const customTheme = {
  customColors: {},
  customSpacing: {
    small: "8px",
    medium: "16px",
    large: "32px",
  },
  customFontSize: {
    small: "14px",
    medium: "16px",
    large: "20px",
  },
  customBorderRadius: {
    small: "4px",
    medium: "8px",
    large: "16px",
  },
  mixins,
};

const muiTheme = createTheme();

export const theme = {
  ...muiTheme,
  ...customTheme,
};
