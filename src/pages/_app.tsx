import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import Script from "next/script";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ThemeProvider } from "@/components/theme-provider";

import "@/styles/globals.css";
import "@/styles/datePicker.css";
import "@/styles/react-big-calendar.css";

const queryClient = new QueryClient({
  // 임시 기본값 추후 변경
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      gcTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 0,
      refetchInterval: 60 * 1000
    }
  }
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2"
});

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Script
        src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=o0z5l4v6xl"
        strategy="beforeInteractive"
      />
      <Script
        src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=o0z5l4v6xl&submodules=geocoder"
        strategy="beforeInteractive"
      />
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <QueryClientProvider client={queryClient}>
          <div className={`${pretendard.className}`}>
            {getLayout(<Component {...pageProps} />)}
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
