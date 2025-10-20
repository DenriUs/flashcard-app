import zod from 'zod';

import { loginShema, signupShema } from './schemas';

export type LoginShemaType = zod.infer<typeof loginShema>;

export type SignupShemaType = zod.infer<typeof signupShema>;
