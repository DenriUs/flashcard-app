'use server';

import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { loginShema } from '@/components/forms/schemas';
import { LoginShemaType } from '@/components/forms/types';

export const login = async (data: LoginShemaType) => {
  const validationResult = loginShema.safeParse(data);

  if (validationResult.error) {
    return { error: 'Invalid field values' };
  }

  auth.api.signInEmail({ body: { ...data, callbackURL: '/decks' } });

  redirect('/decks');
};
