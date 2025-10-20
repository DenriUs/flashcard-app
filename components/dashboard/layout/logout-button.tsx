'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

import { authClient } from '@/lib/auth-client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogoutClick = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/login');
        },
      },
    });
  };

  return (
    <DropdownMenuItem onClick={handleLogoutClick}>
      <LogOut />
      Log out
    </DropdownMenuItem>
  );
};

export default LogoutButton;
