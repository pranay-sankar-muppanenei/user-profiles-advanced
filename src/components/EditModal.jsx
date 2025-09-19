import React from "react";
import { Modal, Form, Input } from "antd";

const EditModal = ({ user, onClose, onSave }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      onSave({ ...user, ...values, company: { name: values.company } });
      onClose();
    });
  };

  return (
    <Modal
      open={!!user}
      title={`Edit ${user?.name}`}
      onCancel={onClose}
      onOk={handleOk}
      okText="Save"
      cancelText="Cancel"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: user?.name,
          email: user?.email,
          phone: user?.phone,
          company: user?.company?.name,
        }}
      >
        <Form.Item label="Full Name" name="name" rules={[{ required: true }]}>
          <Input placeholder="Enter full name" />
        </Form.Item>
        <Form.Item label="Email Address" name="email" rules={[{ required: true, type: "email" }]}>
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item label="Phone Number" name="phone" rules={[{ required: true }]}>
          <Input placeholder="Enter phone number" />
        </Form.Item>
        <Form.Item label="Company Name" name="company">
          <Input placeholder="Enter company name" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
