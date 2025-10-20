import zod from 'zod';

export const createDeckShema = zod.object({
  title: zod.string().nonempty({ error: 'Enter title' }),
  description: zod.string().optional(),
});
