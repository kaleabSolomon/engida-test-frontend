import React from "react";
import { Button } from "antd";
import TaskCard from "./TaskCard";
import Rating from "./Rating";
import { FaArrowRight } from "react-icons/fa";

const Hero: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 pt-8 pb-16 relative">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-2">Manage Your</h1>

        <h1 className="text-5xl md:text-6xl font-bold text-blue-500 mb-6">
          Productivity
        </h1>

        <p className="text-xl mb-10 max-w-2xl mx-auto">
          Plan Your Tasks, stay on track, and deliver on time without
          overworking yourself.
        </p>

        <div className="flex justify-end">
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
        </div>

        <div className="mt-8">
          <Rating />
        </div>
      </div>

      {/* Task Cards - Positioned Absolutely */}
      <div className="absolute left-0 top-1/3 -translate-x-1/4 rotate-[-10deg]">
        <TaskCard title="Web Visual Design" />
      </div>

      <div className="absolute left-1/4 top-1/4">
        <TaskCard title="UX Copywrite" date="Today" progress={3} total={7} />
      </div>

      <div className="absolute right-0 top-1/3 translate-x-1/4 rotate-[10deg]">
        <TaskCard title="UI Animations" />
      </div>
    </div>
  );
};

export default Hero;
