import { create } from 'zustand';

export type DialogFormType = 'CREATE_DECK';

type DialogFormState = {
  title: string;
  description: string;
  type: DialogFormType | null;
  isOpen: boolean;
  props: { [key: string]: unknown };

  setOpenDialogForm: (isOpen: boolean, type: DialogFormState['type']) => void;
  openDialogForm: (
    type: DialogFormState['type'],
    title?: string,
    description?: string,
    props?: DialogFormState['props'],
  ) => void;
  closeDialogForm: (
    type: DialogFormState['type'],
    title?: string,
    description?: string,
    props?: DialogFormState['props'],
  ) => void;
};

export const useDialogFormStore = create<DialogFormState>((set) => ({
  title: '',
  description: '',
  type: null,
  props: {},
  isOpen: false,

  setOpenDialogForm: (isOpen, type) => set({ type, isOpen }),
  openDialogForm: (type, title = '', description = '', props = {}) =>
    set({ type, isOpen: true, title, description, props }),
  closeDialogForm: (type, title = '', description = '', props = {}) =>
    set({ type, isOpen: false, title, description, props }),
}));
