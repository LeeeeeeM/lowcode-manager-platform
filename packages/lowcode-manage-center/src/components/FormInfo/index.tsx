import { Button, Flex, Form, Input } from "antd";
import { FC, useEffect } from "react";

export interface FormData {
  name: string;
  remark: string;
}

interface FormInfoProps<T> {
  onChange: (key: string, value: string) => void;
  onSubmit: () => void;
  formData: T;
}

const FormInfo: FC<FormInfoProps<FormData>> = (props) => {
  const [form] = Form.useForm();
  const { formData, onChange, onSubmit } = props;

  useEffect(() => {
    form.setFieldsValue({
      name: formData?.name || '',
      remark: formData?.remark || ''
    });
  }, [formData, form]);

  const submitForm = async () => {
    await form.validateFields();
    onSubmit();
  }

  return (
    <Form
      form={form}
      scrollToFirstError
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 12 }}
    >

      <Form.Item name="name" label="项目名称" rules={[{ required: true }]}>
        <Input onChange={(e) => {
          onChange("name", e.target.value);
        }}/>
      </Form.Item>

      <Form.Item name="remark" label="项目备注">
        <Input.TextArea rows={4} onChange={(e) => {
          onChange("remark", e.target.value);
        }}/>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4 }}>
        <Flex gap="small">
          <Button type="primary" onClick={submitForm}>新建项目</Button>
          {/* <Button danger onClick={() => form.resetFields()}>
            Reset
          </Button> */}
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default FormInfo;
