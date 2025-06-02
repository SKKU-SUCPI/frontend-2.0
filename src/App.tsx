import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { theme } from "@/styles/theme";

import Router from "@/Router";
import useRefresh from "@/hooks/auth/useRefresh";
const queryClient = new QueryClient();

const AppContent = () => {
  const { run, isLoading } = useRefresh();

  useEffect(() => {
    run();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // 또는 로딩 컴포넌트를 사용
  }

  return <RouterProvider router={Router} />;
};

const App: React.FC = () => {
  // const { run, isLoading } = useRefresh();

  // useEffect(() => {
  //   run();
  // }, []);

  // if (isLoading) {
  //   return <div>Loading...</div>; // 또는 로딩 컴포넌트를 사용
  // }

  return (
    <MuiThemeProvider theme={theme}>
      <EmotionThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AppContent />
        </QueryClientProvider>
      </EmotionThemeProvider>
    </MuiThemeProvider>
  );
};

export default App;
