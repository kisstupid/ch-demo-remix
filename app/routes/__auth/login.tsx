import type { ActionFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';
import tw from 'tailwind-styled-components';

import { FormField } from '~/components/form-field';
import { Wrapper } from '~/layouts/wrapper';
import { login, register } from '~/utils/auth.server';
import { validateEmail, validateName, validatePassword } from '~/utils/validators.server';

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const action = form.get('_action');
  const email = form.get('email');
  const password = form.get('password');
  let firstName = form.get('firstName');
  let lastName = form.get('lastName');

  if (typeof action !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
    return json({ error: `Invalid Form Data`, form: action }, { status: 400 });
  }

  if (action === 'register' && (typeof firstName !== 'string' || typeof lastName !== 'string')) {
    return json({ error: `Invalid Form Data`, form: action }, { status: 400 });
  }

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
    ...(action === 'register'
      ? {
          firstName: validateName((firstName as string) || ''),
          lastName: validateName((lastName as string) || ''),
        }
      : {}),
  };

  if (Object.values(errors).some(Boolean))
    return json(
      {
        errors,
        fields: { email, password, firstName, lastName },
        form: action,
      },
      { status: 400 },
    );

  switch (action) {
    case 'login': {
      return await login({ email, password });
    }

    case 'register': {
      firstName = firstName as string;
      lastName = lastName as string;
      return await register({ email, password, firstName, lastName });
    }

    default:
      return json({ error: `Invalid Form Data` }, { status: 400 });
  }
};

export default function Login() {
  const actionData = useActionData();

  const firstLoad = useRef(true);
  const [errors, setErrors] = useState(actionData?.errors || {});
  const [formError, setFormError] = useState(actionData?.error || '');
  const [action, setAction] = useState('login');
  const [formData, setFormData] = useState({
    email: actionData?.fields?.email || '',
    password: actionData?.fields?.password || '',
    firstName: actionData?.fields?.lastName || '',
    lastName: actionData?.fields?.firstName || '',
  });

  useEffect(() => {
    if (!firstLoad.current) {
      const newState = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
      };

      setErrors(newState);
      setFormError('');
      setFormData(newState);
    }
  }, [action]);

  useEffect(() => {
    if (!firstLoad.current) setFormError('');
  }, [formData]);

  useEffect(() => {
    firstLoad.current = false;
  }, []);

  // Updates the form data when an input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData((form) => ({ ...form, [field]: event.target.value }));
  };

  return (
    <Wrapper $full $center $flex="col" className="gap-y-4">
      <S.Button className="absolute top-8 right-8" onClick={() => setAction(action == 'login' ? 'register' : 'login')}>
        {action === 'login' ? 'Sign Up' : 'Sign In'}
      </S.Button>

      <S.Title>Welcome to CoderHouse!</S.Title>
      <p className="font-semibold text-slate-300">
        {action === 'login' ? 'Log In To Give Some Vouchers!' : 'Sign Up To Get Started!'}
      </p>

      <S.Form.Container method="POST">
        <S.Form.ErrorText>{formError}</S.Form.ErrorText>

        <FormField
          htmlFor="email"
          label="Email"
          value={formData.email}
          onChange={(e) => handleInputChange(e, 'email')}
          error={errors?.email}
        />
        <FormField
          htmlFor="password"
          type="password"
          label="Password"
          value={formData.password}
          onChange={(e) => handleInputChange(e, 'password')}
          error={errors?.password}
        />

        {action === 'register' && (
          <>
            <FormField
              htmlFor="firstName"
              label="First Name"
              onChange={(e) => handleInputChange(e, 'firstName')}
              value={formData.firstName}
              error={errors?.firstName}
            />
            <FormField
              htmlFor="lastName"
              label="Last Name"
              onChange={(e) => handleInputChange(e, 'lastName')}
              value={formData.lastName}
              error={errors?.lastName}
            />
          </>
        )}

        <Wrapper $center $flex="row">
          <S.Button type="submit" name="_action" value={action} className="">
            {action === 'login' ? 'Sign In' : 'Sign Up'}
          </S.Button>
        </Wrapper>
      </S.Form.Container>
    </Wrapper>
  );
}

const S = {
  Button: tw.button`
    bg-yellow-300 text-blue-600 hover:bg-yellow-400
    rounded-xl font-semibold px-3 py-2 transition duration-300 ease-in-out hover:-translate-y-1
  `,
  Title: tw.h2`
    text-5xl font-extrabold text-yellow-300
  `,
  Form: {
    Container: tw.form<any>`
      rounded-2xl bg-gray-200 p-6 w-96
    `,
    ErrorText: tw.p<any>`
      text-xs font-semibold text-center tracking-wide text-red-500 w-full
    `,
  },
};
