import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Неверный формат email'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
});

export type LoginSchema = z.infer<typeof loginSchema>;