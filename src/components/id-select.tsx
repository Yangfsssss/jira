import { Select } from 'antd';
import React from 'react';
import { Raw } from 'types';

type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
  defaultOptionName?: string;
  value?: Raw | null | undefined;
  onChange?: (value?: number) => void;
  options?: { name: string; id: number }[];
}

/**
 * value 可以传入多种类型的值
 * onChange只会处理 number｜ undefined类型
 * 当 isNaN(Number(value)) 为true时，代表选择默认类型
 * 当选择默认类型时，onChange会回调undefined
 * @param props
 * @constructor
 */

export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;

  return (
    <Select
      value={options?.length === 0 ? 0 : toNumber(value)}
      onChange={(value) => onChange?.(toNumber(value))}
      {...restProps}
    >
      {defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null}

      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
