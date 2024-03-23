import { Html, Head, Main, NextScript } from "next/document";
import { pretendard } from "@/pages/_app";

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
