import { Form, Button, Modal, Input } from "antd";
import { useState } from "react";
import TasksTable from "../features/tasks/components/TasksTable";

const TasksPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields(); // Validate form fields
      console.log("Form Values:", values);
      setIsModalOpen(false); // Close modal after logging
      form.resetFields(); // Reset form after submission
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="mt-12 w-full flex items-center justify-center">
      <div>
        <Button type="primary" onClick={showModal}>
          Open Modal
        </Button>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form form={form} layout="vertical">
            {/* Title Field (Required) */}
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Title is required!" }]}
            >
              <Input placeholder="Enter task title" />
            </Form.Item>

            {/* Description Field (Min 10 Characters) */}
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
      <TasksTable />
    </div>
  );
};

export default TasksPage;
