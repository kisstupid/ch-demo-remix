import { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';

interface FormFieldProps {
  htmlFor: string;
  label: string;
  type?: string;
  value: any;
  onChange?: (...args: any) => any;
  error?: string;
}

export function FormField({ htmlFor, label, type = 'text', value, onChange, error = '' }: FormFieldProps) {
  const [errorText, setErrorText] = useState(error);

  useEffect(() => {
    setErrorText(error);
  }, [error]);

  return (
    <>
      <S.Label htmlFor={htmlFor}>{label}</S.Label>
      <input
        id={htmlFor}
        className="w-full p-2 rounded-xl my-2"
        type={type}
        name={htmlFor}
        value={value}
        onChange={(e) => {
          onChange?.(e);
          setErrorText('');
        }}
      />
      <S.ErrorText>{errorText || ''}</S.ErrorText>
    </>
  );
}

const S = {
  ErrorText: tw.p`
    text-xs font-semibold text-center tracking-wide text-red-500 w-full
  `,
  Label: tw.label`
    text-blue-600 font-semibold
  `,
};
