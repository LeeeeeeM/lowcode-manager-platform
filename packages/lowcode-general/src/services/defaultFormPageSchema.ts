import {
  FORM_BUTTON_GROUP,
  FORM_BUTTON_GROUP_CLASSNAME,
  FORM_CONTAINER_ID,
  FORM_REF_NAME,
  FORM_RESET_BUTTON_ID,
  FORM_SUBMIT_BUTTON_ID,
} from '../constants';

export function uuid() {
  return ((Math.random() * 1e6) >> 0).toString(36);
}

export default {
  componentName: 'Page',
  id: 'node_dockcviv8fo1',
  props: {
    ref: 'outerView',
    style: {
      height: '100%',
    },
  },
  docId: 'doclaqkk3b9',
  fileName: '/',
  dataSource: {
    list: [],
  },
  state: {
    text: {
      type: 'JSExpression',
      value: '"outer"',
    },
    isShowDialog: {
      type: 'JSExpression',
      value: 'false',
    },
  },
  css: 'body {\n  font-size: 12px;\n}\n\n.button {\n  width: 100px;\n  color: #ff00ff\n}',
  lifeCycles: {
    componentDidMount: {
      type: 'JSFunction',
      value: "function componentDidMount() {\n  console.log('did mount');\n}",
    },
    componentWillUnmount: {
      type: 'JSFunction',
      value: "function componentWillUnmount() {\n  console.log('will unmount');\n}",
    },
  },
  methods: {
    testFunc: {
      type: 'JSFunction',
      value: "function testFunc() {\n  console.log('test func');\n}",
    },
    onClick: {
      type: 'JSFunction',
      value: 'function onClick() {\n  this.setState({\n  isShowDialog: true\n  });\n}',
    },
    closeDialog: {
      type: 'JSFunction',
      value: 'function closeDialog() {\n  this.setState({\n  isShowDialog: false\n  });\n}',
    },
    getHelloWorldText: {
      type: 'JSFunction',
      value: "function getHelloWorldText() {\n  return this.i18n('i18n-jwg27yo4');\n}",
    },
    getHelloWorldText2: {
      type: 'JSFunction',
      value:
        "function getHelloWorldText2() {\n  return this.i18n('i18n-jwg27yo3', {\n  name: 'slm'\n  });\n}",
    },
    onTestConstantsButtonClicked: {
      type: 'JSFunction',
      value:
        "function onTestConstantsButtonClicked() {\n  console.log('constants.ConstantA:', this.constants.ConstantA);\n  console.log('constants.ConstantB:', this.constants.ConstantB);\n}",
    },
    onTestUtilsButtonClicked: {
      type: 'JSFunction',
      value: "function onTestUtilsButtonClicked() {\n  this.utils.demoUtil('param1', 'param2');\n}",
    },
  },
  originCode:
    "class LowcodeComponent extends Component {\n  state = {\n    \"text\": \"outer\",\n    \"isShowDialog\": false\n  }\n  componentDidMount() {\n    console.log('did mount');\n  }\n  componentWillUnmount() {\n    console.log('will unmount');\n  }\n  testFunc() {\n    console.log('test func');\n  }\n  onClick() {\n    this.setState({\n      isShowDialog: true\n    });\n  }\n  closeDialog() {\n    this.setState({\n      isShowDialog: false\n    });\n  }\n  getHelloWorldText() {\n    return this.i18n('i18n-jwg27yo4');\n  }\n  getHelloWorldText2() {\n    return this.i18n('i18n-jwg27yo3', {\n      name: 'slm',\n    });\n  }\n  onTestConstantsButtonClicked() {\n    console.log('constants.ConstantA:', this.constants.ConstantA);\n    console.log('constants.ConstantB:', this.constants.ConstantB);\n\t}\n\tonTestUtilsButtonClicked(){\n    this.utils.demoUtil('param1', 'param2');\n\t}\n}",
  hidden: false,
  title: '',
  isLocked: false,
  condition: true,
  conditionGroup: '',
  children: [
    {
      componentName: 'FormPageContainer',
      id: FORM_CONTAINER_ID,
      props: {
        labelCol: {
          span: 6,
        },
        wrapperCol: {
          span: 14,
        },
        onValuesChange: {
          type: 'JSExpression',
          value:
            "function() {\n      const self = this;\n      try {\n        return (function onValuesChange(changedValues, allValues) {\n  console.log('onValuesChange', changedValues, allValues);\n}).apply(self, arguments);\n      } catch(e) {\n        console.warn('call function which parsed by lowcode failed: ', e);\n        return e.message;\n      }\n    }",
        },
        onFinish: {
          type: 'JSExpression',
          value:
            "function() {\n      const self = this;\n      try {\n        return (function onFinish(values) {\n  console.log('onFinish', values);\n}).apply(self, arguments);\n      } catch(e) {\n        console.warn('call function which parsed by lowcode failed: ', e);\n        return e.message;\n      }\n    }",
        },
        onFinishFailed: {
          type: 'JSExpression',
          value:
            "function() {\n      const self = this;\n      try {\n        return (function onFinishFailed({ values, errorFields, outOfDate }) {\n  console.log('onFinishFailed', values, errorFields, outOfDate);\n}).apply(self, arguments);\n      } catch(e) {\n        console.warn('call function which parsed by lowcode failed: ', e);\n        return e.message;\n      }\n    }",
        },
        name: `form_container_${uuid()}`,
        ref: FORM_REF_NAME,
        colon: false,
        hideRequiredMark: false,
        preserve: true,
        scrollToFirstError: true,
        validateMessages: {
          required: "'${name}' 不能为空",
        },
      },
      version: '0.1.0',
      hidden: false,
      title: '',
      isLocked: false,
      condition: true,
      conditionGroup: '',
      loopArgs: [null, null],
      children: [
        {
          componentName: 'Form.Item',
          id: 'node_ocm64u2opq2',
          props: {
            label: '表单项',
            labelAlign: 'right',
            colon: true,
            required: true,
            noStyle: false,
            valuePropName: 'value',
            name: `form_item_${uuid()}`,
            requiredobj: {
              required: true,
              message: '必填',
            },
            ref: `form.item_first-field`,
          },
          hidden: false,
          title: '',
          isLocked: false,
          condition: true,
          conditionGroup: '',
          loopArgs: [null, null],
          children: [
            {
              componentName: 'Input',
              id: 'node_ocm64u2opq3',
              props: {
                placeholder: '请输入',
                bordered: true,
                disabled: false,
                size: 'middle',
              },
              hidden: false,
              title: '',
              isLocked: false,
              condition: true,
              conditionGroup: '',
            },
          ],
        },
        {
          componentName: 'Form.Item',
          id: 'node_ocm64u2opq4',
          props: {
            label: '表单项',
            labelAlign: 'right',
            colon: true,
            required: false,
            noStyle: false,
            valuePropName: 'value',
            name: `form_item_${uuid()}`,
          },
          hidden: false,
          title: '',
          isLocked: false,
          condition: true,
          conditionGroup: '',
          children: [
            {
              componentName: 'InputNumber',
              id: 'node_ocm64u2opq5',
              props: {
                placeholder: '请输入',
                autoFocus: false,
                disabled: false,
                controls: true,
                bordered: true,
                size: 'middle',
              },
              hidden: false,
              title: '',
              isLocked: false,
              condition: true,
              conditionGroup: '',
            },
          ],
        },
        {
          componentName: 'Form.Item',
          id: 'node_ocm64u2opq6',
          props: {
            label: '表单项',
            labelAlign: 'right',
            colon: true,
            required: false,
            noStyle: false,
            valuePropName: 'value',
            name: `form_item_${uuid()}`,
          },
          hidden: false,
          title: '',
          isLocked: false,
          condition: true,
          conditionGroup: '',
          children: [
            {
              componentName: 'Input.Password',
              id: 'node_ocm64u2opq7',
              props: {
                bordered: true,
                disabled: false,
                visibilityToggle: true,
                placeholder: '请输入',
                size: 'middle',
              },
              hidden: false,
              title: '',
              isLocked: false,
              condition: true,
              conditionGroup: '',
            },
          ],
        },
      ],
    },
  ],
};

const submitCode = function () {
  // @ts-ignore
  const form = this.$('form_ref');
  if (form) {
    // @ts-ignore
    form
      .validateFields()
      // @ts-ignore
      .then((values) => {
        console.log(values);
      })
      // @ts-ignore
      .catch((e) => {
        console.error(e);
      });
  }
};

// 最终在运行时插入
export const ButtonGroup = {
  componentName: 'Form.Item',
  id: FORM_BUTTON_GROUP,
  props: {
    className: FORM_BUTTON_GROUP_CLASSNAME,
    wrapperCol: {
      offset: 0,
    },
  },
  hidden: false,
  title: '',
  isLocked: false,
  condition: true,
  conditionGroup: '',
  children: [
    {
      componentName: 'Button',
      id: FORM_SUBMIT_BUTTON_ID,
      props: {
        type: 'primary',
        children: '提交',
        // htmlType: 'submit',
        onClick: {
          type: 'JSFunction',
          value: `${submitCode.toString()}`,
        },
      },
      hidden: false,
      title: '',
      isLocked: false,
      condition: true,
      conditionGroup: '',
    },
    {
      componentName: 'Button',
      id: FORM_RESET_BUTTON_ID,
      props: {
        style: {
          marginLeft: 20,
        },
        children: '取消',
      },
      hidden: false,
      title: '',
      isLocked: false,
      condition: true,
      conditionGroup: '',
    },
  ],
};
