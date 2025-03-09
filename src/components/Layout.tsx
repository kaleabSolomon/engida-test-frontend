import React from "react";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-200">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
