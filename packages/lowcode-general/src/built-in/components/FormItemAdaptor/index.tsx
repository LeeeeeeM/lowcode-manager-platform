import { FC } from 'react';
import { FORM_COMP_ENUM, FORM_ITEM_ADAPTOR_NAME } from '../../../constants/components';
import { BuiltInComponentInterface } from '../types';
// @ts-ignore
import styles from './index.module.less';

const FormItemAdaptor: FC = (props: any) => {
  const { currentComponent, formData, parentProps, currrentProps } = props;

  const formItemName = parentProps.name;

  const value = formData[formItemName];

  let InnerText = '---';

  switch (currentComponent) {
    case FORM_COMP_ENUM.Input:
    case FORM_COMP_ENUM.Password:
    case FORM_COMP_ENUM.TextArea:
    case FORM_COMP_ENUM.InputNumber:
      if (value) {
        InnerText = value;
      }
      break;
    case FORM_COMP_ENUM.RadioGroup:
    case FORM_COMP_ENUM.Select:
      const { options = [] } = currrentProps || {};
      const label = options.find((item: any) => item.value === value)?.label;
      if (label) {
        InnerText = label;
      }
      break;
    case FORM_COMP_ENUM.CheckboxGroup:
      const { options: labelOptions = [] } = currrentProps || {};
      const labels = labelOptions.filter((item: any) => value.includes(item.value));
      if (labels.length) {
        InnerText = labels.map((item: any) => item.label).join(',');
      }
      break;
    default:
      break;
  }

  return <div className={styles['form-item-adaptor-container']}>{InnerText}</div>;
};

const comps: BuiltInComponentInterface = {
  name: FORM_ITEM_ADAPTOR_NAME,
  component: FormItemAdaptor,
};

export default comps;
