import { FC, useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "antd";

interface AddPageModalProps {
  visible: boolean;
  closeModal: () => void;
  onConfirm: (name: string) => Promise<unknown>;
}

const AddPageModal: FC<AddPageModalProps> = (props) => {
  const [form] = Form.useForm();
  const {
    visible = false,
    closeModal = () => {},
    onConfirm = () => {},
  } = props;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        name: "",
      });
    }
  }, [form, visible]);

  const handleOk = async () => {
    setLoading(true);
    try {
      const result = await form.validateFields();
      await onConfirm(result.name);
      closeModal();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <Modal
      open={visible}
      destroyOnClose={true}
      title="新建页面"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          取消
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleOk}
        >
          创建
        </Button>,
      ]}
    >
      <Form
        form={form}
        // labelCol={{ span: 4 }}
        // wrapperCol={{ span: 18 }}
      >
        <Form.Item name="name" label="页面名称" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPageModal;
