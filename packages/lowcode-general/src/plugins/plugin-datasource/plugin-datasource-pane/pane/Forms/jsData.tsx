import React, { PureComponent } from 'react';
import { connect } from '@formily/react';
import { JSFunction as IJSFunction } from '@alilc/lowcode-types';
import MonacoEditor from '@alilc/lowcode-plugin-base-monaco-editor';
import _noop from 'lodash/noop';
// import { editor } from 'monaco-editor';

export interface JSProps {
  className: string;
  value: IJSFunction;
  onChange?: (val: any) => void;
}

export interface JSState {}

export class JSComp extends PureComponent<
  JSProps,
  JSState
> {
  static isFieldComponent = true;

  static defaultProps = {
    onChange: _noop,
  };

  // private monacoRef: any = null;

  handleEditorChange = (newValue: string) => {
    this.props.onChange?.({
      value: newValue,
    });
  };

  // handleEditorDidMount = (isFullscreen: boolean, editor, monaco) => {
  //   this.monacoRef = monaco?.editor;
  // };

  render() {
    const { value, className } = this.props;
    return (
      <div className={className}>
        <MonacoEditor
          theme="vs-vision"
          value={value?.value ?? ''}
          language="javascript"
          onChange={this.handleEditorChange}
          // editorDidMount={this.handleEditorDidMount}
        />
      </div>
    );
  }
}

export const JSData = connect(JSComp);
