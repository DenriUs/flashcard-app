'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { signup } from '@/actions/auth/signup';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';

import { SignupShemaType } from './types';
import { signupShema } from './schemas';

export function SignupForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorText, setErrorText] = useState('');

  const form = useForm<SignupShemaType>({
    resolver: zodResolver(signupShema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = async (values: SignupShemaType) => {
    setIsSubmitting(true);
    setErrorText('');

    const result = await signup(values);
    if (result?.error) {
      setErrorText(result.error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className={'flex flex-col gap-6'}>
      <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Enter your information below to create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FieldGroup>
              <Controller
                name='fullName'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='fullName'>Full Name</FieldLabel>
                    <Input
                      {...field}
                      id='fullName'
                      aria-invalid={fieldState.invalid}
                      placeholder='Enter your full name'
                      disabled={isSubmitting}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
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
                      placeholder='you@example.com'
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
                    <FieldLabel htmlFor='password'>Password</FieldLabel>
                    <Input {...field} id='password' type='password' disabled={isSubmitting} />
                    {fieldState.invalid ? (
                      <FieldError errors={[fieldState.error]} />
                    ) : (
                      <FieldDescription>Password must be 8-20 characters long.</FieldDescription>
                    )}
                  </Field>
                )}
              />
              <Controller
                name='confirmPassword'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='confirmPassword'>Confirm Password</FieldLabel>
                    <Input
                      {...field}
                      id='confirmPassword'
                      type='password'
                      disabled={isSubmitting}
                    />
                    {fieldState.invalid ? (
                      <FieldError errors={[fieldState.error]} />
                    ) : (
                      <FieldDescription>Please confirm your password.</FieldDescription>
                    )}
                  </Field>
                )}
              />
              {errorText && <FieldError errors={[{ message: errorText }]} />}
              <Field>
                <Button type='submit' disabled={isSubmitting}>
                  {isSubmitting ? <Spinner /> : 'Signup'}
                </Button>
                <Button variant='outline' type='button' disabled={isSubmitting}>
                  Login with Google
                </Button>
                <FieldDescription className='text-center'>
                  Already have an account?{' '}
                  <Link
                    href='/login'
                    className={cn(isSubmitting && 'opacity-50 pointer-events-none')}
                  >
                    Sign in
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
