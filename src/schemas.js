import { z } from 'zod';

export const signupSchema = z.object({
  name:z.string(),
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
  });