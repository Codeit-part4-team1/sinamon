import { Html, Head, Main, NextScript } from "next/document";
import { pretendard } from "@/pages/_app";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="ko" suppressHydrationWarning>
      <Head />
      <body className={`relative ${pretendard.className}`}>
        <Main />
        <NextScript />
        <div id="modal-root"></div>
      </body>
    </Html>
  );
}
