import { FC, useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { PATH_REG } from "/@/constants";

interface DownloadModalProps {
  visible: boolean;
  closeModal: () => void;
  onConfirm: (name: string) => Promise<unknown>;
}

const DownloadModal: FC<DownloadModalProps> = (props) => {
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
        path: "",
      });
    }
  }, [form, visible]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const checkPath = async (_: unknown, value: string) => {
    if (PATH_REG.test(value) || value === '/') {
      return Promise.resolve();
    }
    return Promise.reject(`不是合法路径，请使用 xxx/yyy 等格式`);
  };

  const handleOk = async () => {
    setLoading(true);
    try {
      const result = await form.validateFields();
      await onConfirm(result.path);
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
      title="页面路径"
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
          下载
        </Button>,
      ]}
    >
      <Form
        form={form}
        // labelCol={{ span: 4 }}
        // wrapperCol={{ span: 18 }}
      >
        <Form.Item
          name="path"
          label="页面路径"
          rules={[
            {
              required: true,
              validator: checkPath,
            }
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DownloadModal;
