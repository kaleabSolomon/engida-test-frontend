import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tag, notification, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { fetchTasks } from "../taskSlice";
import { AppDispatch, RootState } from "../../../store";
import { Task, TaskStatus } from "../../../types/task";
import { FiEdit2 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { formatCreatedAt } from "../../../utils/utils";

const TasksTable = () => {
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
        duration: 4, // Display for 4 seconds
      });
    }
  }, [error]);

  // Placeholder functions for edit and delete actions
  const handleEdit = (task: Task) => {
    console.log("Edit task:", task);
    // Add your edit logic here (e.g., open a modal with a form)
  };

  const handleDelete = (taskId: string) => {
    console.log("Delete task with ID:", taskId);
    // Add your delete logic here (e.g., dispatch a Redux action to delete)
  };

  // Define Ant Design Table columns
  const columns: ColumnsType<Task> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: TaskStatus) => {
        const color =
          status === TaskStatus.done
            ? "green"
            : status === TaskStatus.inProgress
            ? "blue"
            : "volcano";
        return (
          <Tag color={color} className="text-md first-letter:capitalize">
            {status.split("_").join(" ").toLowerCase()}
          </Tag>
        );
      },
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => formatCreatedAt(createdAt), // Apply formatting here
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, task) => (
        <Space>
          <FiEdit2
            className="text-blue-500 hover:text-blue-600 hover:scale-110 duration-100"
            onClick={() => handleEdit(task)}
          />{" "}
          <MdDelete
            className="text-red-500 hover:text-red-600 hover:scale-110 duration-100"
            size={18}
            onClick={() => handleDelete(task.id)}
          />{" "}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Task List</h2>

      <Table
        columns={columns}
        dataSource={
          status === "loading" ? [] : tasks.filter((task) => !task.isDeleted)
        }
        rowKey="id"
        pagination={{ pageSize: 10 }}
        loading={status === "loading"} // This shows "Loading..." inside the table body
      />
    </div>
  );
};

export default TasksTable;
