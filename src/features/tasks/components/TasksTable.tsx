import { Table, Tag, Space, notification, Button, Select, Input } from "antd";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiEdit2 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import type { ColumnsType } from "antd/es/table";
import { AppDispatch, RootState } from "../../../store";
import { Task, TaskStatus } from "../../../types/task";
import { deleteTask, fetchTasks, updateTask } from "../taskSlice";
import { formatCreatedAt } from "../../../utils/utils";

const { Option } = Select;

const TasksTable: React.FC = () => {
  // State to track which task is being edited
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  // State to store the updated values while editing
  const [editedTask, setEditedTask] = useState<Partial<Task>>({});

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

  // Handles changes in the edit input fields (Title, Description, Status)
  const handleChange = (field: keyof Task, value: string) => {
    setEditedTask((prev) => ({ ...prev, [field]: value }));
  };
  const handleEdit = (task: Task) => {
    setEditingTaskId(task.id); // Set the task being edited
    setEditedTask({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  };

  // Function to save the edited task
  const handleSave = (taskId: string) => {
    dispatch(updateTask({ taskId, updates: editedTask })); // Dispatch update action
    setEditingTaskId(null); // Exit edit mode after saving
  };

  const handleDelete = (taskId: string): void => {
    dispatch(deleteTask(taskId));
  };

  const columns: ColumnsType<Task> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "15%",
      render: (text, record) =>
        editingTaskId === record.id ? ( // Check if this task is being edited
          <Input
            value={editedTask.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        ) : (
          text
        ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "40%",
      ellipsis: { showTitle: false },
      render: (text, record) =>
        editingTaskId === record.id ? ( // Show text area when editing
          <Input.TextArea
            value={editedTask.description}
            onChange={(e) => handleChange("description", e.target.value)}
            minLength={10} // Enforce minimum length
          />
        ) : (
          text
        ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "15%",
      render: (status, record) =>
        editingTaskId === record.id ? ( // Show dropdown when editing
          <Select
            value={editedTask.status}
            onChange={(value) => handleChange("status", value)}
          >
            <Option value={TaskStatus.todo}>To Do</Option>
            <Option value={TaskStatus.inProgress}>In Progress</Option>
            <Option value={TaskStatus.done}>Done</Option>
          </Select>
        ) : (
          <Tag
            color={
              status === TaskStatus.done
                ? "green"
                : status === TaskStatus.inProgress
                ? "blue"
                : "volcano"
            }
          >
            {status.split("_").join(" ").toLowerCase()}
          </Tag>
        ),
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
      render: (_, task) =>
        editingTaskId === task.id ? ( // Show Save button if editing
          <Button type="primary" onClick={() => handleSave(task.id)}>
            Save
          </Button>
        ) : (
          <Space>
            {/* Edit button to enter edit mode */}
            <FiEdit2
              className="text-blue-500 hover:text-blue-600 hover:scale-110 duration-100"
              onClick={() => handleEdit(task)}
            />
            {/* Delete button */}
            <MdDelete
              className="text-red-500 hover:text-red-600 hover:scale-110 duration-100"
              size={18}
              onClick={() => handleDelete(task.id)}
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
          status === "loading"
            ? []
            : tasks.filter((task: { isDeleted: boolean }) => !task.isDeleted)
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
