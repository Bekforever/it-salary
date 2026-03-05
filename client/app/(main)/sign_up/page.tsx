'use client'
import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { Select, SelectItem } from '@heroui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'

import { useGetAllCities } from '@/utils/api/city/api'
import { useGetAllExperiences } from '@/utils/api/experience/api'
import { useGetAllPositions } from '@/utils/api/position/api'
import { useCreateUser } from '@/utils/api/user/api'

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
  role: z.enum(['boss', 'user'], { message: 'Role is required' }),
  city: z.string().nonempty({ message: 'City is required' }),
  experience: z.string().nonempty({ message: 'Experience is required' }),
  position: z.string().nonempty({ message: 'Position is required' }),
  salary: z.string().regex(/^\d+$/, { message: 'Salary must be a number' }),
})

type FormValues = z.infer<typeof schema>

const RegistrationForm = () => {
  const router = useRouter()
  const { data: cities } = useGetAllCities()
  const { data: experiences } = useGetAllExperiences()
  const { data: positions } = useGetAllPositions()
  const { mutateAsync: createUser, isError, error } = useCreateUser()

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormValues) => {
    await createUser(data)
    router.push('/sign_in')
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
              <SelectItem key="boss" value="boss">Boss</SelectItem>
              <SelectItem key="user" value="user">User</SelectItem>
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
              {(cities ?? []).map((city) => (
                <SelectItem key={city.id} value={city.id}>
                  {city.name}
                </SelectItem>
              ))}
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
              {(experiences ?? []).map((exp) => (
                <SelectItem key={exp.id} value={exp.id}>
                  {exp.name}
                </SelectItem>
              ))}
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
              {(positions ?? []).map((pos) => (
                <SelectItem key={pos.id} value={pos.id}>
                  {pos.name}
                </SelectItem>
              ))}
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

      {isError && (
        <span className="text-red-500">
          {(error as any)?.response?.data?.message ?? 'Registration failed'}
        </span>
      )}

      <Button type="submit">Register</Button>
    </form>
  )
}

export default RegistrationForm
