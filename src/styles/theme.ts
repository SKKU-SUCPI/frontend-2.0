// theme.ts
import { createTheme } from "@mui/material";

const customTheme = {
  customColors: {
    border: "#eceff1",
    surface: "#ffffff",
  },
  customShadows: {
    card: "0 2px 8px rgba(0, 0, 0, 0.05)",
    hover: "0 5px 15px rgba(0, 0, 0, 0.1)",
  },
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
};

const muiTheme = createTheme();

export const theme = {
  ...muiTheme,
  ...customTheme,
};
