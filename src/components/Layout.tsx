import React from "react";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-heroImg bg-center bg-cover bg-no-repeat ">
      <div className="h-full w-full bg-black bg-clip-padding backdrop-filter bg-opacity-60">
        <Header />
        <main className="flex items-center justify-center flex-col">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
