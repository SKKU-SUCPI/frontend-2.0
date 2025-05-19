// theme.ts
import { createTheme } from "@mui/material";

const customTheme = {
  customColors: {
    lq: "#0088FE",
    rq: "#00C49F",
    cq: "#FFBB28",
    approved: "#2ecc40", // 승인 - 초록
    pending: "#ffcc00", // 대기 - 노랑
    rejected: "#ff4d4f", // 반려 - 빨강
    black: "000000",
    darkGray: "#333",
    mediumGray: "#757575",
    lightGray: "#e0e0e0",
  },
  customWeights: {
    bold: "600",
    semibold: "500",
    normal: "400",
  },
  customSpacing: {},
  customFontSize: {
    title: "2.5rem",
    subtitle: "1.8rem",
    itemTitle: "1.5rem",
  },
  customBorderRadius: {},
};

const muiTheme = createTheme();

export const theme = {
  ...muiTheme,
  ...customTheme,
};
