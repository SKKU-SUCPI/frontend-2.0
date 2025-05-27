import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { theme } from "@/styles/theme";

import Router from "@/Router";
import getRefresh from "./apis/auth/getRefresh";
const queryClient = new QueryClient();

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const refreshToken = async () => {
      try {
        await getRefresh();
      } finally {
        setIsLoading(false);
      }
    };
    refreshToken();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // 또는 로딩 컴포넌트를 사용
  }

  return (
    <MuiThemeProvider theme={theme}>
      <EmotionThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={Router} />
        </QueryClientProvider>
      </EmotionThemeProvider>
    </MuiThemeProvider>
  );
};

export default App;
