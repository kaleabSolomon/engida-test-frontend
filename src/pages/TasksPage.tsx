import { Form, Button, Modal, Input } from "antd";
import { useState } from "react";

import TasksTable from "../features/tasks/components/TasksTable";

import Header from "../components/Header";

const TasksPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [form] = Form.useForm();

  const showModal = (): void => {
    setIsModalOpen(true);
  };

  const handleOk = async (): Promise<void> => {
    try {
      const values = await form.validateFields();
      console.log("Form Values:", values);
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  const handleCancel = (): void => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">My Tasks</h2>
            <Button
              type="primary"
              onClick={showModal}
              size="large"
              className="bg-blue-500 hover:bg-blue-600"
            >
              Add New Task
            </Button>
          </div>

          <TasksTable />

          <Modal
            title="Create New Task"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Create Task"
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
