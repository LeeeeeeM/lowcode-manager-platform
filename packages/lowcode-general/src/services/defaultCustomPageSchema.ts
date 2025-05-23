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
};
