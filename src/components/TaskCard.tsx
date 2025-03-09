import React from "react";
import { TaskStatus } from "../types/task";
import { Tag } from "antd";

interface TaskCardProps {
  title: string;
  date?: string;
  status?: TaskStatus;
}

const getColor = (status: TaskStatus) => {
  return status === TaskStatus.done
    ? "green"
    : status === TaskStatus.inProgress
    ? "gold"
    : "red";
};

const TaskCard: React.FC<TaskCardProps> = ({ title, date, status }) => {
  return (
    <div className="flex items-center gap-x-1 bg-white/80 rounded-xl shadow-lg p-4  transform rotate-3">
      <div className="mb-2 flex items-center">
        <div className="w-5 h-5 rounded-full bg-blue-500 mr-2"></div>
        <span className="font-medium">{title}</span>
      </div>

      {status && (
        <div className="flex items-center text-sm text-gray-600">
          <span className="flex items-center mx-1">
            <div className="w-2 h-2 rounded-full bg-gray-300 mr-2"></div>
            <Tag
              color={getColor(status)}
              className="text-md first-letter:capitalize"
            >
              {status.split("_").join(" ").toLowerCase()}
            </Tag>
            <div className="w-2 h-2 rounded-full bg-gray-300 "></div>
          </span>
          {date && <span className="ml-1">{date}</span>}
        </div>
      )}
    </div>
  );
};

export default TaskCard;
