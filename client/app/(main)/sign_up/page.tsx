'use client'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@nextui-org/input'
import { Select, SelectItem } from '@nextui-org/select'
import { Button } from '@nextui-org/button'

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  role: z.enum(['boss', 'employee'], { message: 'Role is required' }),
  city: z.string().nonempty({ message: 'City is required' }),
  experience: z.string().nonempty({ message: 'Experience is required' }),
  position: z.string().nonempty({ message: 'Position is required' }),
  salary: z.string().regex(/^\d+$/, { message: 'Salary must be a number' }),
})

const RegistrationForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data) => {
    console.log('Form values:', data)
  }

  return (
    <form style={{
      display: 'flex', flexDirection: 'column', gap: '16px', width: '400px'
    }} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label='Email'
              placeholder='Enter your email'
              // error={errors.email?.message}
            />
          )}
        />
      </div>

      <div>
        <Controller
          name='password'
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label='Password'
              placeholder='Enter your password'
              type='password'
              // error={errors.password?.message}
            />
          )}
        />
      </div>

      <div>
        <Controller
          name='role'
          control={control}
          render={({ field }) => (
            <Select {...field} label='Role'>
              <SelectItem value='boss'>Boss</SelectItem>
              <SelectItem value='employee'>Employee</SelectItem>
            </Select>
          )}
        />
      </div>

      <div>
        <Controller
          name='city'
          control={control}
          render={({ field }) => (
            <Select {...field} label='City'>
              <SelectItem value='5bdf0b03-0653-40cf-8841-0a8f648407bb'>City 1</SelectItem>
              <SelectItem value='another-city-id'>City 2</SelectItem>
            </Select>
          )}
        />
      </div>

      <div>
        <Controller
          name='experience'
          control={control}
          render={({ field }) => (
            <Select {...field} label='Experience'>
              <SelectItem value='d6f390c2-a412-404c-a36f-0265da03b117'>Junior</SelectItem>
              <SelectItem value='another-experience-id'>Senior</SelectItem>
            </Select>
          )}
        />
      </div>

      <div>
        <Controller
          name='position'
          control={control}
          render={({ field }) => (
            <Select {...field} label='Position'>
              <SelectItem value='1f56eb9d-7e39-4660-8c52-feda5da8ee73'>Developer</SelectItem>
              <SelectItem value='another-position-id'>Designer</SelectItem>
            </Select>
          )}
        />
      </div>

      <div>
        <Controller
          name='salary'
          control={control}
          render={({ field }) => (
            <Input {...field} label='Salary' placeholder='Enter your salary' />
          )}
        />
      </div>

      <Button type='submit'>Register</Button>
    </form>
  )
}

export default RegistrationForm
