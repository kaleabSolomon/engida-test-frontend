import { Form, Button, Modal, Input } from "antd";
import { useState } from "react";

import TasksTable from "../features/tasks/components/TasksTable";

import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../features/tasks/taskSlice";
import { AppDispatch, RootState } from "../store";

const TasksPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.tasks);
  const { user } = useSelector((state: RootState) => state.auth);
  const showModal = (): void => {
    setIsModalOpen(true);
  };

  console.log(user);

  const handleOk = async (): Promise<void> => {
    try {
      const values = await form.validateFields();
      console.log("Form Values:", values);

      const resultAction = await dispatch(createTask(values));

      if (createTask.fulfilled.match(resultAction)) {
        setIsModalOpen(false);
        form.resetFields();
      } else {
        console.error("Task creation failed:", resultAction.error.message);
      }
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  const handleCancel = (): void => {
    setIsModalOpen(false);
  };

  return (
    <div className="h-screen">
      <Header />
      <div className="p-6 h-full bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold mt-3 mb-6">
            Welcome, {user.firstName}
          </h2>

          <TasksTable />
          <div className="flex justify-end mt-20">
            <Button
              type="primary"
              onClick={showModal}
              size="large"
              className="bg-blue-500 hover:bg-blue-600"
            >
              Add New Task
            </Button>
          </div>
          <Modal
            title="Create New Task"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Create Task"
            confirmLoading={status === "loading"}
            cancelButtonProps={{ disabled: status === "loading" }}
            okButtonProps={{ className: "bg-blue-500 hover:bg-blue-600" }}
          >
            <Form form={form} layout="vertical">
              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: "Title is required!" }]}
              >
                <Input placeholder="Enter task title" />
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Description is required!" },
                  {
                    min: 10,
                    message: "Description must be at least 10 characters",
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="Enter task description" />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
