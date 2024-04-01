import { ReactNode } from "react";
import { useTheme } from "next-themes";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import { Moon, Sun } from "lucide-react";

interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Header />
      <main className="pt-5 md:pt-7 px-4 md:px-6">
        <div className="max-w-screen-lg mx-auto mb-36 md:mb-48">
          {children}
          <button
            className="fixed right-12 bottom-12 w-10 h-10 flex justify-center items-center rounded border border-white-ffffff bg-black"
            type="button"
            onClick={
              theme === "dark"
                ? () => setTheme("light")
                : () => setTheme("dark")
            }
          >
            <Sun className="text-white-ffffff hidden dark:block" />
            <Moon className="text-white-ffffff block dark:hidden" />
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BaseLayout;
