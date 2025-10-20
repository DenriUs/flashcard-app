import Link from 'next/link';

import UserButton from './user-button';
import CreateButton from './create-button';

const DashboardHeader = () => {
  return (
    <header className='flex justify-between h-16 shrink-0 items-center gap-2 border-b px-8'>
      <h1 className='text-2xl font-medium'>
        <Link href='/dashboard/decks'>Flashcards app</Link>
      </h1>
      <div className='flex gap-2 items-center'>
        <CreateButton />
        <UserButton />
      </div>
    </header>
  );
};

export default DashboardHeader;
