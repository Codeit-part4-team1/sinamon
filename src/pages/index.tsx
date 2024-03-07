import localFont from "next/font/local";

const pretendard = localFont({
  src: [
    {
      path: "./fonts/PretendardVariable.woff2"
    }
  ]
});

export default function Home() {
  return <main className={`${pretendard.className} font-sans`}></main>;
}
