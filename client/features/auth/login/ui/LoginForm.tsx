'use client'

import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ILoginCredentials } from '../model/types'
import { useLoginMutation } from '../model/use-login'

const schema = z.object({
  email: z.string().email('Неверный формат email'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
})

export default function LoginForm() {
  const { mutate: login } = useLoginMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginCredentials>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: ILoginCredentials) => {
    login(data)
  }

  return (
    <div className="w-[350px] flex flex-col gap-5">
      <h2 className="text-2xl font-bold">Вход в систему</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            label="Email"
            {...register('email')}
            placeholder="example@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Input
            label="Пароль"
            {...register('password')}
            placeholder="••••••••"
            type="password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <Button type="submit">Войти</Button>
      </form>
    </div>
  )
}
