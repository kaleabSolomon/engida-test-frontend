import { Table, Tag, Space, notification, Button } from "antd";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiEdit2 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import type { ColumnsType } from "antd/es/table";
import { RootState } from "@reduxjs/toolkit/query";
import { AppDispatch } from "../../../store";
import { Task, TaskStatus } from "../../../types/task";
import { fetchTasks } from "../taskSlice";

// Helper function for date formatting
const formatCreatedAt = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const TasksTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, status, error } = useSelector(
    (state: RootState) => state.tasks
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTasks());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (error) {
      notification.error({
        message: "Error Fetching Tasks",
        description: error || "Something went wrong.",
        placement: "topRight",
        duration: 4,
      });
    }
  }, [error]);

  const handleEdit = (task: Task): void => {
    console.log("Edit task:", task);
  };

  const handleDelete = (taskId: string): void => {
    console.log("Delete task with ID:", taskId);
  };

  const columns: ColumnsType<Task> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "15%",
      render: (text: string) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "40%",
      ellipsis: { showTitle: false },
      render: (text: string) => (
        <div className="max-h-32 overflow-y-auto">{text}</div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "15%",
      render: (status: TaskStatus) => {
        const color =
          status === TaskStatus.done
            ? "green"
            : status === TaskStatus.inProgress
            ? "blue"
            : "volcano";
        return (
          <Tag
            color={color}
            className="text-md first-letter:capitalize px-3 py-1"
          >
            {status.toLowerCase().replace("_", " ")}
          </Tag>
        );
      },
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "15%",
      render: (createdAt: string) => formatCreatedAt(createdAt),
    },
    {
      title: "Actions",
      key: "actions",
      width: "15%",
      render: (_: any, task: Task) => (
        <Space>
          <Button
            type="text"
            icon={<FiEdit2 className="text-blue-500" />}
            onClick={() => handleEdit(task)}
            className="hover:bg-blue-50"
          />
          <Button
            type="text"
            icon={<MdDelete className="text-red-500" size={18} />}
            onClick={() => handleDelete(task.id)}
            className="hover:bg-red-50"
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Table
        columns={columns}
        dataSource={
          status === "loading" ? [] : tasks.filter((task) => !task.isDeleted)
        }
        rowKey="id"
        pagination={{ pageSize: 10 }}
        loading={status === "loading"}
        className="w-full"
        scroll={{ x: 1000 }}
        bordered
      />
    </div>
  );
};

export default TasksTable;
