import type { AppProps } from "next/app";
import AuthProvider from "@/contexts/AuthProvider";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import localFont from "next/font/local";

export const pretendard = localFont({
  src: [
    {
      path: "./fonts/PretendardVariable.woff2"
    }
  ]
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <main className={`${pretendard.className}`}>
          <Component {...pageProps} />
        </main>
      </AuthProvider>
    </ThemeProvider>
  );
}
