import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import DashboardHeader from '@/components/dashboard/layout/header';
import DialogFormManager from '@/components/dialogs/manager';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/login');
  }

  return (
    <>
      <DialogFormManager />
      <DashboardHeader />
      <main className='max-w-[96rem] w-full p-10'>{children}</main>
    </>
  );
}
