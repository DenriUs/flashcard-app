import React from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import CreateDeckButton from './create-deck-button';

const CreateButton = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size='sm' className='cursor-pointer'>
            <Plus />
            Create
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='rounded-lg' align='end'>
          <DropdownMenuGroup>
            <CreateDeckButton />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CreateButton;
