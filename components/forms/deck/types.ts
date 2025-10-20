import zod from 'zod';

import { createDeckShema } from './schemas';

export type CreateDeckShemaType = zod.infer<typeof createDeckShema>;
