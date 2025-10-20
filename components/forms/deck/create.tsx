'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { createDeck } from '@/actions/decks/create';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Spinner } from '@/components/ui/spinner';

import { CreateDeckShemaType } from './types';
import { createDeckShema } from './schemas';
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface IProps {
  onClose: () => void;
}

export function CreateDeckForm({ onClose }: IProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorText, setErrorText] = useState('');

  const form = useForm<CreateDeckShemaType>({
    resolver: zodResolver(createDeckShema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const handleSubmit = async (values: CreateDeckShemaType) => {
    setIsSubmitting(true);
    setErrorText('');

    const result = await createDeck(values);
    if (result?.error) {
      setErrorText(result.error);
      setIsSubmitting(false);
    }
    onClose();
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Create a new card deck</DialogTitle>
        <DialogDescription>Enter title and optionally description</DialogDescription>
      </DialogHeader>
      <div className={'flex flex-col gap-6'}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup>
            <Controller
              name='title'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='title'>Title</FieldLabel>
                  <Input
                    {...field}
                    id='title'
                    aria-invalid={fieldState.invalid}
                    disabled={isSubmitting}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name='description'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='description'>Description</FieldLabel>
                  <Textarea {...field} id='description' disabled={isSubmitting} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            {errorText && <FieldError errors={[{ message: errorText }]} />}
            <Field>
              <Button type='submit' disabled={isSubmitting}>
                {isSubmitting ? <Spinner /> : 'Create'}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </>
  );
}
