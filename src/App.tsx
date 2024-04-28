declare const __VERSION__: string;

// style
import "react-multi-carousel/lib/styles.css";

import { App as AntdApp, ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import React from "react";
import Routers from "./routes";
// antd theme
import antdTheme from "./styles/antdTheme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  console.log(__VERSION__);

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={antdTheme}>
        <AntdApp>
          <Routers />
        </AntdApp>
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default App;
