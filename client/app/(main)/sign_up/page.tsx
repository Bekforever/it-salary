'use client'
import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { Select, SelectItem } from '@heroui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
  role: z.enum(['boss', 'employee'], { message: 'Role is required' }),
  city: z.string().nonempty({ message: 'City is required' }),
  experience: z.string().nonempty({ message: 'Experience is required' }),
  position: z.string().nonempty({ message: 'Position is required' }),
  salary: z.string().regex(/^\d+$/, { message: 'Salary must be a number' }),
})

const RegistrationForm = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data) => {
    console.log('Form values:', data)
  }

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '400px',
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input
              {...field}
              label="Email"
              placeholder="Enter your email"
              // error={errors.email?.message}
            />
          )}
        />
      </div>

      <div>
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input
              {...field}
              label="Password"
              placeholder="Enter your password"
              type="password"
              // error={errors.password?.message}
            />
          )}
        />
      </div>

      <div>
        <Controller
          control={control}
          name="role"
          render={({ field }) => (
            <Select {...field} label="Role">
              <SelectItem value="boss">Boss</SelectItem>
              <SelectItem value="employee">Employee</SelectItem>
            </Select>
          )}
        />
      </div>

      <div>
        <Controller
          control={control}
          name="city"
          render={({ field }) => (
            <Select {...field} label="City">
              <SelectItem value="5bdf0b03-0653-40cf-8841-0a8f648407bb">
                City 1
              </SelectItem>
              <SelectItem value="another-city-id">City 2</SelectItem>
            </Select>
          )}
        />
      </div>

      <div>
        <Controller
          control={control}
          name="experience"
          render={({ field }) => (
            <Select {...field} label="Experience">
              <SelectItem value="d6f390c2-a412-404c-a36f-0265da03b117">
                Junior
              </SelectItem>
              <SelectItem value="another-experience-id">Senior</SelectItem>
            </Select>
          )}
        />
      </div>

      <div>
        <Controller
          control={control}
          name="position"
          render={({ field }) => (
            <Select {...field} label="Position">
              <SelectItem value="1f56eb9d-7e39-4660-8c52-feda5da8ee73">
                Developer
              </SelectItem>
              <SelectItem value="another-position-id">Designer</SelectItem>
            </Select>
          )}
        />
      </div>

      <div>
        <Controller
          control={control}
          name="salary"
          render={({ field }) => (
            <Input {...field} label="Salary" placeholder="Enter your salary" />
          )}
        />
      </div>

      <Button type="submit">Register</Button>
    </form>
  )
}

export default RegistrationForm
