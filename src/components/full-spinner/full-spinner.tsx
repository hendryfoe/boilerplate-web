import React from 'react';
import { Space, Spin, SpinProps } from 'antd';

export interface FullSpinnerProps {
  spinProps?: SpinProps;
  style?: React.CSSProperties;
}

const FullSpinner: React.FC<FullSpinnerProps> = ({ style, spinProps }) => {
  return (
    <Space style={{ justifyContent: 'center', ...style }}>
      <Spin data-testid="spinner-element" size="large" {...spinProps} />
    </Space>
  );
};

export { FullSpinner };
