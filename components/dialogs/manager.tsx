'use client';

import React from 'react';

import { useDialogFormStore } from '@/stores/use-dialog-form';
import { CreateDeckForm } from '@/components/forms/deck/create';
import ResponsiveDialog from '@/components/ui/responsive-dialog';

const DialogFormManager = () => {
  const { type, isOpen, props, setOpenDialogForm, closeDialogForm } = useDialogFormStore();

  let DialogForm;
  switch (type) {
    case 'CREATE_DECK':
      DialogForm = <CreateDeckForm {...props} onClose={() => closeDialogForm('CREATE_DECK')} />;
      break;
    default:
      DialogForm = null;
  }

  if (!DialogForm) return null;

  return (
    <ResponsiveDialog open={isOpen} onOpenChange={(open) => setOpenDialogForm(open, type)}>
      {DialogForm}
    </ResponsiveDialog>
  );
};

export default DialogFormManager;
