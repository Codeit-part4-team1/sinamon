import { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <>
      <Header />
      <main className="pt-5 md:pt-7 px-4 md:px-6">
        <div className="max-w-screen-lg mx-auto mb-36 md:mb-48">{children}</div>
      </main>
      <Footer />
    </>
  );
};

export default BaseLayout;
