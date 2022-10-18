import { ButtonHTMLAttributes } from 'react';
import '../styles/button.scss';

type IButton = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: IButton) {
  return <button className='button' {...props} />;
}
