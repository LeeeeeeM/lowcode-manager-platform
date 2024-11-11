// @todo schema default
import React, { FC, forwardRef, useImperativeHandle, useRef } from 'react';
import _isPlainObject from 'lodash/isPlainObject';
import _thru from 'lodash/thru';
import _isArray from 'lodash/isArray';
import _cloneDeep from 'lodash/cloneDeep';
import _mergeWith from 'lodash/mergeWith';
import _get from 'lodash/get';

import { DataSourceFormProps } from '@alilc/lowcode-plugin-datasource-pane/lib/types';
import { DataSourceIdentityType } from '../type';

import { DataSourceForm } from '@alilc/lowcode-plugin-datasource-pane/lib/components/DataSourceForm';
import { VariableDataSourceForm } from './VariableDataSourceForm';

export interface DataSourceFormAction {
  submit: () => Promise<any>;
}

/**
 * 通过是否存在 ID 来决定读写状态
 */
export const DataSourceFormEntry: FC<DataSourceFormProps> = forwardRef<
  DataSourceFormAction,
  DataSourceFormProps
>((props, ref) => {
  const { dataSourceType, dataSource, dataSourceList, mode } = props;

  const instanceRef = useRef<{ submit: () => Promise<any> }>();

  useImperativeHandle(ref, () => {
    return {
      submit() {
        if (instanceRef.current?.submit) {
          return instanceRef.current?.submit();
        }
        return Promise.resolve('no source found');
      },
    };
  });

  if (
    [DataSourceIdentityType.VARIABLE].includes(
      dataSourceType?.type as DataSourceIdentityType,
    )
  ) {
    return (
      <VariableDataSourceForm
        // @ts-ignore
        ref={instanceRef}
        dataSourceType={dataSourceType}
        dataSource={dataSource}
        dataSourceList={dataSourceList}
        mode={mode}
      ></VariableDataSourceForm>
    );
  }

  return (
    <DataSourceForm
      // @ts-ignore
      ref={instanceRef}
      dataSourceType={dataSourceType}
      dataSource={dataSource}
      dataSourceList={dataSourceList}
      mode={mode}
    ></DataSourceForm>
  );
});
