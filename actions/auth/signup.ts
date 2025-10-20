'use server';

import { redirect } from 'next/navigation';

import { prisma } from '@/lib/db-client';
import { auth } from '@/lib/auth';
import { signupShema } from '@/components/forms/auth/schemas';
import { SignupShemaType } from '@/components/forms/auth/types';

export const signup = async (data: SignupShemaType) => {
  const validationResult = signupShema.safeParse(data);

  if (validationResult.error) {
    return { error: 'Invalid field values' };
  }

  const user = await prisma.user.findFirst({ where: { email: data.email } });

  if (user) {
    return { error: 'This email is already taken' };
  }

  await auth.api.signUpEmail({ body: { ...data, name: data.fullName } });

  redirect('/dashboard/decks');
};
