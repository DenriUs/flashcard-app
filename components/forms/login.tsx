'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { login } from '@/actions/auth/login';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { LoginShemaType } from './types';
import { loginShema } from './schemas';

export function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorText, setErrorText] = useState('');

  const form = useForm<LoginShemaType>({
    resolver: zodResolver(loginShema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (values: LoginShemaType) => {
    setIsSubmitting(true);
    setErrorText('');

    const result = await login(values);
    if (result?.error) {
      setErrorText(result.error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className={'flex flex-col gap-6'}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FieldGroup>
              <Controller
                name='email'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='email'>Email</FieldLabel>
                    <Input
                      {...field}
                      id='email'
                      aria-invalid={fieldState.invalid}
                      disabled={isSubmitting}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name='password'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className='flex items-center'>
                      <FieldLabel htmlFor='password'>Password</FieldLabel>
                      <Link
                        href='#'
                        className={cn(
                          'ml-auto inline-block text-sm underline-offset-4 hover:underline',
                          isSubmitting && 'opacity-50 pointer-events-none',
                        )}
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input {...field} id='password' type='password' disabled={isSubmitting} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              {errorText && <FieldError errors={[{ message: errorText }]} />}
              <Field>
                <Button type='submit' disabled={isSubmitting}>
                  Login
                </Button>
                <Button variant='outline' type='button' disabled={isSubmitting}>
                  Login with Google
                </Button>
                <FieldDescription className='text-center'>
                  Don&apos;t have an account?{' '}
                  <Link
                    href='/signup'
                    className={cn(isSubmitting && 'opacity-50 pointer-events-none')}
                  >
                    Sign up
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
