import zod from 'zod';

export const loginShema = zod.object({
  email: zod.email(),
  password: zod.string().nonempty({ error: 'Enter password' }),
});

export const signupShema = zod
  .object({
    fullName: zod.string().nonempty({ error: 'Enter full name' }),
    email: zod.string().nonempty({ error: 'Enter email' }).email(),
    password: zod
      .string()
      .nonempty({ error: 'Enter password' })
      .min(8, { error: 'Password must be at least 8 characters long' })
      .max(20, { error: 'Password must not exceed 20 characters' }),
    confirmPassword: zod.string().nonempty({ error: "Passwords don't match" }),
  })
  .refine((values) => values.confirmPassword === values.password, {
    error: "Passwords don't match",
    path: ['confirmPassword'],
  });
