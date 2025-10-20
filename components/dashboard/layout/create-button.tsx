import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, WalletCards } from 'lucide-react';
import React from 'react';

const CreateButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='sm'>
          <Plus />
          Create
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='rounded-lg' align='end'>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <WalletCards />
            Deck
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CreateButton;
