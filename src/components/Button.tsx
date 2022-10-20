import { ButtonHTMLAttributes } from 'react';
import '../styles/button.scss';

type IButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export function Button({ isOutlined = false, ...props }: IButton) {
  return (
    <button className={`button ${isOutlined ? 'outlined' : ''}`} {...props} />
  );
}
