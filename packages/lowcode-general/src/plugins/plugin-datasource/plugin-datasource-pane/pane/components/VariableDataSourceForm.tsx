// @todo schema default
import React, { PureComponent } from 'react';
import { createForm, registerValidateRules, Form as FormilyForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import {
  Form,
  FormCollapse,
  FormLayout,
  FormItem,
  ArrayItems,
  Input,
  Switch,
  NumberPicker
} from '@formily/next';
import _isPlainObject from 'lodash/isPlainObject';
import _thru from 'lodash/thru';
import _isArray from 'lodash/isArray';
import _cloneDeep from 'lodash/cloneDeep';
import _mergeWith from 'lodash/mergeWith';
import _get from 'lodash/get';
import traverse from 'traverse';

import { JSData } from '../Forms/jsData';

import { generateClassName } from '@alilc/lowcode-plugin-datasource-pane/lib/utils/misc';
import { filterXDisplay } from '@alilc/lowcode-plugin-datasource-pane/lib/utils/filter-x-display';

import { DataSourceFormProps, DataSourceFormMode } from '@alilc/lowcode-plugin-datasource-pane/lib/types';

const SCHEMA = {
  type: 'object',
  properties: {
    type: {
      title: '类型',
      type: 'string',
      readOnly: true,
      'x-decorator': 'FormItem',
      'x-component-props': {
        // labelWidth: 300,
      },
    },
    id: {
      type: 'string',
      title: '数据源 ID',
      required: true,
    },
    desc: {
      type: 'string',
      title: '描述'
    },
    code: {
      title: '自定义数据',
      // type: 'string',
      'x-component': 'JSData',
      default: {
        value: '[]',
      },
    }
  },
};

/**
 * 通过是否存在 ID 来决定读写状态
 */
export class VariableDataSourceForm extends PureComponent<DataSourceFormProps, { form: FormilyForm }> {
  constructor(props: any) {
    super(props);

    this.state = {
      form: this.createForm(),
    };
  }

  createForm(): FormilyForm {
    return createForm({
      initialValues: this.deriveInitialData(this.props.dataSource),
    });
  }

  componentDidUpdate(prevProps: DataSourceFormProps) {
    const type = this.props.dataSourceType?.type;
    const ptype = prevProps.dataSourceType?.type;
    // dataSource 或 dataSourceType.type 变了，需要更新 form，界面刷新
    if (this.props.dataSource !== prevProps.dataSource || type !== ptype) {
      this.setState({
        form: this.createForm(),
      });
    }
  }

  submit = () => {
    return this.state.form
      .submit()
      .then((formData: any) => {
        return formData;
      })
      .catch((err) => {
        console.error('v', err);
        return null;
      });
  };

  deriveInitialData = (dataSource: object = {}) => {
    const { dataSourceType } = this.props;
    const result: any = _cloneDeep(dataSource);

    result.type = dataSourceType.type;

    return result;
  };

  deriveSchema = () => {
    const { dataSourceType, dataSourceList = [], mode } = this.props;
    // 添加校验规则
    // TODO 返回对象会报错
    registerValidateRules({
      validateDataSourceId(value, rule) {
        if (dataSourceList?.find((i) => i.id === value)) {
          return rule.message as string;
        }
        return '';
      },
    });

    // @todo 减小覆盖的风险
    const formSchema: any = _mergeWith({}, SCHEMA, dataSourceType.schema, (objValue, srcValue) => {
      if (_isArray(objValue)) {
        return srcValue;
      }
    });

    // 过滤 x-display 值为隐藏的属性
    filterXDisplay(formSchema);

    if (mode === DataSourceFormMode.CREATE) {
      formSchema.properties.id['x-validator'] = {
        validateDataSourceId: true,
        message: '该数据源已存在',
      };
    }

    return {
      type: 'object',
      properties: {
        layout: {
          type: 'void',
          'x-component': 'FormLayout',
          'x-component-props': {
            labelCol: 6,
            wrapperCol: 14,
            layout: 'vertical'
          },
          properties: traverse(formSchema).forEach((node) => {
            if (node?.type && !node['x-component']) {
              if (node.type === 'string') {
                node['x-component'] = 'Input';
              } else if (node.type === 'number') {
                node['x-component'] = 'NumberPicker';
              } else if (node.type === 'boolean') {
                node['x-component'] = 'Switch';
                node['x-component-props'] = {
                  size: 'small',
                  // labelWidth: 300,
                  style: {
                    width: '50px',
                  },
                };
              }
            }
            if (
              node &&
              node['x-component'] &&
              node['x-component'].indexOf('FormCollapse') === -1 &&
              node['x-component'].indexOf('ArrayItems.') === -1
            ) {
              node['x-decorator'] = 'FormItem';
            }
          }).properties,
        },
      },
    };
  };

  render() {
    const SchemaField = createSchemaField({
      components: {
        Input,
        Switch,
        NumberPicker,
        FormItem,
        ArrayItems,
        FormLayout,
        FormCollapse,
        JSData
      },
    });

    return (
      <div className={generateClassName('create')}>
        <Form form={this.state.form}>
          <SchemaField
            schema={_thru(this.deriveSchema(), (arg) => {
              return arg;
            })}
          />
        </Form>
      </div>
    );
  }
}
