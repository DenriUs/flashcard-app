import { Suspense } from 'react';

import DecksList from '@/components/decks/list';
import DecksLoading from '@/components/decks/loading';

export default async function DecksPage() {
  return (
    <Suspense fallback={<DecksLoading />}>
      <DecksList />
    </Suspense>
  );
}
