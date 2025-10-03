import { loginSchema } from '../schemas'

type LoginState = {
  errors?: { email?: string[]; password?: string[] }
  message?: string
  data?: { email?: string; password?: string }
}

export async function loginAction(
  prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = formData.get('email')?.toString() ?? ''
  const password = formData.get('password')?.toString() ?? ''

  const validatedFields = loginSchema.safeParse({ email, password })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  return {
    message: 'Авторизация успешна',
    data: validatedFields.data,
  }
}
