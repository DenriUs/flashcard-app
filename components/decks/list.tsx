import React from 'react';
import { headers } from 'next/headers';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db-client';
import DeckItem from './item';

const DecksList = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const decks = await prisma.deck.findMany({ where: { userId: session?.user.id } });

  await new Promise((resolve) => setTimeout(() => resolve({}), 5000));

  return (
    <div className='grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {decks.map((deck) => (
        <DeckItem key={deck.id} {...deck} />
      ))}
    </div>
  );
};

export default DecksList;
