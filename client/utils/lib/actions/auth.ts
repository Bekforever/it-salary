import { ILoginCredentials } from '@/utils/api/auth/types'
import { loginSchema } from '../schemas'

export function loginAction({ email, password }: ILoginCredentials) {
  // Validate form fields
  const validatedFields = loginSchema.safeParse({
    email,
    password,
  })

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  console.log(validatedFields)

  return {
    message: 'Авторизация успешна',
    data: validatedFields.data,
  }
}
