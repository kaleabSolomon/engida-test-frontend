import React from "react";
import { Button } from "antd";
import TaskCard from "./TaskCard";
import Rating from "./Rating";
import { FaArrowRight } from "react-icons/fa";
import { TaskStatus } from "../types/task";
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-[1000px] min-h-screen  flex flex-col items-center justify-start text-center px-4 pt-32  pb-16 relative">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-2 text-white">
          Manage Your
        </h1>

        <h1 className="text-5xl md:text-6xl font-bold text-blue-500 mb-6">
          Productivity
        </h1>

        <p className="text-xl mb-10 max-w-2xl mx-auto text-white">
          Plan Your Tasks, stay on track, and deliver on time without
          overworking yourself.
        </p>

        <div className="flex justify-end">
          <Button
            type="primary"
            shape="default"
            className="group duration-200 flex items-center gap-2"
            onClick={() => navigate("/signin")}
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
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="absolute left-0 top-96 -translate-x-1/4 rotate-[-10deg]">
          <TaskCard
            title="Export The figma file"
            status={TaskStatus.inProgress}
            date="Today"
          />
        </div>
        <div className="absolute left-2/4 top-2/3 translate-x-1/4 rotate-[-10deg]">
          <TaskCard
            title="get groceries"
            date="5 seconds ago"
            status={TaskStatus.done}
          />
        </div>
        <div className="absolute right-0 top-0 translate-x-1/4 rotate-[10deg]">
          <TaskCard
            title="Add Authentication"
            status={TaskStatus.todo}
            date="2 days ago"
          />
        </div>
      </div>

      {/* Mobile Layout: Stack Cards at the Bottom */}
      <div className="lg:hidden flex flex-col items-center gap-4 mt-12">
        <TaskCard
          title="Export The figma file"
          status={TaskStatus.inProgress}
          date="Today"
        />
        <TaskCard
          title="get groceries"
          date="5 seconds ago"
          status={TaskStatus.done}
        />
        <TaskCard
          title="Add Authentication"
          status={TaskStatus.todo}
          date="2 days ago"
        />
      </div>
    </div>
  );
};

export default Hero;
