import React from "react";
import { Button } from "antd";
import { FaArrowRight } from "react-icons/fa";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center py-4 px-12 w-full">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
          <div className="w-5 h-5 bg-white rounded-full"></div>
        </div>{" "}
        <span className="ml-2 text-xl font-bold">JOT</span>
      </div>

      <Button
        type="primary"
        shape="default"
        className="group duration-200 flex items-center gap-2"
      >
        Get Started
        <span className="relative transition-transform duration-200 group-hover:translate-x-1">
          <FaArrowRight />
        </span>
      </Button>
    </header>
  );
};

export default Header;
