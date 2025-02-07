import { FC, useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { DEFAULT_PAGE_INFO, ID_REG, PAGE_TYPE_TEXT_MAP } from "/@/constants";
import { PAGE_TYPE } from "services/constants";

export interface PageInfo {
  name: string;
  identifier: string;
  id?: number;
  pageType?: PAGE_TYPE
}

interface AddPageModalProps<T> {
  visible: boolean;
  closeModal: () => void;
  onConfirm: (value: T) => Promise<unknown>;
  info: PageInfo;
}

const AddPageModal: FC<AddPageModalProps<PageInfo>> = (props) => {
  const [form] = Form.useForm();
  const {
    visible = false,
    closeModal = () => {},
    onConfirm = () => {},
    info = DEFAULT_PAGE_INFO,
  } = props;

  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const checkId = async (_: unknown, value: string) => {
    if (ID_REG.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(`请使用数字、字母、-、_`);
  };

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(info);
    }
  }, [form, visible, info]);

  const handleOk = async () => {
    setLoading(true);
    try {
      const result = await form.validateFields();
      await onConfirm(result);
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
      title={info.identifier ? `修改${PAGE_TYPE_TEXT_MAP[info.pageType || PAGE_TYPE.CUSTOM].text}` : `新建${PAGE_TYPE_TEXT_MAP[info.pageType || PAGE_TYPE.CUSTOM].text}`}
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
          {info?.identifier ? "保存" : "创建"}
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
        <Form.Item
          name="identifier"
          label="页面标识"
          rules={[{ required: true, validator: checkId }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPageModal;
