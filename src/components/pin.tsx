import { Rate } from 'antd';
import React from 'react';

interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Pin = ({ checked, onCheckedChange, ...restProps }: PinProps) => {
  return (
    <Rate value={checked === true ? 1 : 0} count={1} onChange={(num) => onCheckedChange?.(!!num)} {...restProps} />
  );
};
