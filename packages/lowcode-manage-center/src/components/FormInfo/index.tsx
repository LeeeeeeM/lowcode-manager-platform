import { Button, Flex, Form, Input } from "antd";
import { FC, useEffect } from "react";
import { ProjectInfo } from "/@/services/entity";

export interface FormInfoProps<T> {
  onChange?: (key: string, value: string) => void;
  onSubmit?: () => void;
  formData: T;
  showSubmit?: boolean;
  editable?: boolean;
}

const FormInfo: FC<FormInfoProps<ProjectInfo>> = (props) => {
  const [form] = Form.useForm();
  const { formData, onChange = () => {}, onSubmit = () => {}, showSubmit = true, editable = true } = props;

  useEffect(() => {
    form.setFieldsValue({
      name: formData?.name || "",
      remark: formData?.remark || "",
    });
  }, [formData, form]);

  const submitForm = () => {
    form.validateFields().then(onSubmit);
  };

  return (
    <Form
      form={form}
      scrollToFirstError
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 12 }}
      disabled={!editable}
    >
      <Form.Item name="name" label="项目名称" rules={[{ required: true }]}>
        <Input
          onChange={(e) => {
            onChange("name", e.target.value);
          }}
        />
      </Form.Item>

      <Form.Item name="remark" label="项目备注">
        <Input.TextArea
          rows={4}
          onChange={(e) => {
            onChange("remark", e.target.value);
          }}
        />
      </Form.Item>

      {showSubmit && (
        <Form.Item wrapperCol={{ offset: 4 }}>
          <Flex gap="small">
            <Button type="primary" onClick={submitForm}>
              新建项目
            </Button>
          </Flex>
        </Form.Item>
      )}
    </Form>
  );
};

export default FormInfo;
