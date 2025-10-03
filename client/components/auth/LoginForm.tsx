'use client'

import { useActionState } from 'react'

import { InputField } from '../ui/input-field'

import { SubmitButton } from './submit-button'

import { loginAction } from '@/utils/lib/actions/auth'

export function LoginForm() {
  const initialState = { errors: {}, message: '' }

  const [state, action] = useActionState(loginAction, initialState)

  return (
    <div className="w-[350px]">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold">Вход в систему</h2>
        <p className="text-small text-default-500">
          Введите ваши учетные данные для входа
        </p>
      </div>
      <div>
        <form action={action} className="space-y-4">
          <InputField
            error={state.errors?.email?.[0]}
            id="email"
            label="Email"
            placeholder="example@example.com"
            type="email"
          />
          <InputField
            error={state.errors?.password?.[0]}
            id="password"
            label="Пароль"
            placeholder="••••••••"
            type="password"
          />
          <SubmitButton />
        </form>
        {state.message && (
          <p
            className={`mt-4 text-center ${state.errors ? 'text-danger' : 'text-success'}`}
          >
            {state.message}
          </p>
        )}
      </div>
    </div>
  )
}
