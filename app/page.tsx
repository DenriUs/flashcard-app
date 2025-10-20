import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className='font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20'>
      <main className='flex row-start-2 items-center sm:items-start'>
        <div className='flex flex-col gap-10 w-full items-center'>
          <h1 className='text-5xl font-medium'>Welcome!</h1>
          <div className='flex gap-[10px] row-start-2 items-center sm:items-start'>
            <Link href='/login'>
              <Button variant='ghost'>Login</Button>
            </Link>
            <Link href='/signup'>
              <Button>Singup</Button>
            </Link>
          </div>
        </div>
      </main>
      <footer className='row-start-3 flex gap-[24px] flex-wrap items-center justify-center'></footer>
    </div>
  );
}
