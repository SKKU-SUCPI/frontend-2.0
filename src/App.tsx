import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { theme } from "@/styles/theme";

import Router from "@/Router";
import useRefresh from "@/hooks/auth/useRefresh";
import Loading from "@/components/layouts/Loading";

const queryClient = new QueryClient();

const AppContent = () => {
  const { run, isLoading } = useRefresh();

  useEffect(() => {
    run();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return <RouterProvider router={Router} />;
};

const App: React.FC = () => {
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
