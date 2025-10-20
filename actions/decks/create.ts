'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { CreateDeckShemaType } from '@/components/forms/deck/types';
import { createDeckShema } from '@/components/forms/deck/schemas';
import { prisma } from '@/lib/db-client';
import { revalidatePath } from 'next/cache';

export const createDeck = async (data: CreateDeckShemaType) => {
  const validationResult = createDeckShema.safeParse(data);

  if (validationResult.error) {
    return { error: 'Invalid field values' };
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/login');
  }

  await prisma.deck.create({
    data: {
      title: data.title,
      description: data.description,
      user: { connect: { id: session.user.id } },
    },
  });

  revalidatePath('/dashboard/decks');

  return { success: 'Deck is created successfully!' };
};
