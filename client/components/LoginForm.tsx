'use client'

import { useActionState } from 'react'
import { InputField } from './input-field'
import { ActionState, loginAction } from '@/utils/lib/actions'
import { SubmitButton } from './submit-button'

export function LoginForm() {
  const initialState: ActionState = {
    errors: {},
    message: '',
  }

  const [state, action] = useActionState(loginAction, initialState)

  return (
    <div className='w-[350px]'>
      <div className='flex flex-col items-center'>
        <h2 className='text-2xl font-bold'>Вход в систему</h2>
        <p className='text-small text-default-500'>
          Введите ваши учетные данные для входа
        </p>
      </div>
      <div>
        <form action={action} className='space-y-4'>
          <InputField
            label='Email'
            id='email'
            type='email'
            placeholder='example@example.com'
            error={state.errors?.email?.[0]}
          />
          <InputField
            label='Пароль'
            id='password'
            type='password'
            placeholder='••••••••'
            error={state.errors?.password?.[0]}
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
