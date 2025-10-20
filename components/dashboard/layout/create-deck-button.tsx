'use client';

import React from 'react';
import { WalletCards } from 'lucide-react';

import { useDialogFormStore } from '@/stores/use-dialog-form';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

const CreateDeckButton = () => {
  const openDialogForm = useDialogFormStore((state) => state.openDialogForm);

  const handleClick = () => openDialogForm('CREATE_DECK');

  return (
    <DropdownMenuItem onClick={handleClick}>
      <WalletCards />
      Deck
    </DropdownMenuItem>
  );
};

export default CreateDeckButton;
