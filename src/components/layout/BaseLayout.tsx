import { ReactNode } from "react";
import Header from "@/components/layout/Header";

interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <>
      <Header />
      <main className="max-w-screen-lg mx-auto">{children}</main>
    </>
  );
};

export default BaseLayout;
