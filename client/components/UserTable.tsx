'use client'
import { useGetAllCities } from '@/utils/api/city/api'
import { useGetAllExperiences } from '@/utils/api/experience/api'
import { useGetAllPositions } from '@/utils/api/position/api'
import { useGetAllUsers, useCreateUser, useDeleteUser, useUpdateUser } from '@/utils/api/user/api'
import { IUser } from '@/utils/api/user/types'
import { formatDate } from '@/utils/lib/formatDate'
import { formatNumber } from '@/utils/lib/formatNumber'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { useDisclosure, Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/modal'
import { Select, SelectItem } from '@nextui-org/select'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const userSchema = z.object({
  email: z.string().email('Invalid email address'),
  role: z.string().min(1, 'Role is required'),
  city: z.string().min(1, 'City is required'),
  experience: z.string().min(1, 'Experience is required'),
  position: z.string().min(1, 'Position is required'),
  salary: z.string().min(1, 'Salary is required'),
})

export default function UserTable() {
  // Ваши данные
  const { data: users } = useGetAllUsers()
  const { data: cities } = useGetAllCities()
  const { data: experiences } = useGetAllExperiences()
  const { data: positions } = useGetAllPositions()
  const { mutateAsync: createUser, isError, error } = useCreateUser()
  const { mutate: deleteUser } = useDeleteUser()
  const { mutateAsync: updateUser } = useUpdateUser()
  const [editingUser, setEditingUser] = useState<any | null>(null)
  const { isOpen, onOpenChange, onOpen } = useDisclosure()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IUser>({
    resolver: zodResolver(userSchema),
  })

  const handleAdd = (data: IUser) => {
    if (editingUser) {
      updateUser({ ...data, id: editingUser.id }).then(() => {
        reset()
        onOpenChange()
      })
    } else {
      createUser(data).then(() => {
        reset()
        onOpenChange()
      })
    }
    setEditingUser(null)
  }

  const handleEdit = (user: IUser) => {
    setEditingUser(user)
    reset(user)
    onOpen()
  }

  const handleDelete = (id: string) => {
    deleteUser(id)
  }

  useEffect(() => {
    if (!isOpen) {
      reset({})
      setEditingUser(null)
    }
  }, [isOpen])

  return (
    <div className='w-full mt-10 flex flex-col gap-5'>
      <div className='flex items-center justify-between'>
        <h1 className='font-bold'>Users</h1>
        <Button onClick={onOpen}>Add User</Button>
      </div>
      <Table
        aria-label='Users Table'
        style={{
          height: 'auto',
          minWidth: '100%',
        }}
      >
        <TableHeader>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>ROLE</TableColumn>
          <TableColumn>CITY</TableColumn>
          <TableColumn>POSITION</TableColumn>
          <TableColumn>EXPERIENCE</TableColumn>
          <TableColumn>SALARY</TableColumn>
          <TableColumn>CREATED AT</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {users?.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{cities?.find((city) => city.id === user.city)?.name}</TableCell>
              <TableCell>
                {positions?.find((position) => position.id === user.position)?.name}
              </TableCell>
              <TableCell>
                {experiences?.find((experience) => experience.id === user.experience)?.name}
              </TableCell>
              <TableCell>{formatNumber(user.salary)}</TableCell>
              <TableCell>{formatDate(user.createdAt)}</TableCell>
              <TableCell style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Button size='sm' onClick={() => handleEdit(user)}>
                  Edit
                </Button>
                <Button size='sm' onClick={() => handleDelete(user.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>
            <h3>{editingUser ? 'Edit User' : 'Add User'}</h3>
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(handleAdd)}>
              <div className='flex flex-col gap-3'>
                <Input {...register('email')} placeholder='Email' label='Email' fullWidth />
                <span className='text-red-500'>{errors.email?.message}</span>
                <Input {...register('role')} placeholder='Role' label='Role' fullWidth />
                <span className='text-red-500'>{errors.role?.message}</span>
                <Select
                  label='City'
                  onSelectionChange={(value) => setValue('city', value.currentKey)}
                  defaultSelectedKeys={editingUser ? [editingUser.city] : []}
                >
                  {cities?.map((city) => (
                    <SelectItem key={city.id} value={city.id}>
                      {city.name}
                    </SelectItem>
                  ))}
                </Select>
                <span className='text-red-500'>{errors.city?.message}</span>
                <Select
                  label='Experience'
                  onSelectionChange={(value) => setValue('experience', value.currentKey)}
                  defaultSelectedKeys={editingUser ? [editingUser.experience] : []}
                >
                  {experiences?.map((experience) => (
                    <SelectItem key={experience.id} value={experience.id}>
                      {experience.name}
                    </SelectItem>
                  ))}
                </Select>
                <span className='text-red-500'>{errors.experience?.message}</span>
                <Select
                  label='Position'
                  onSelectionChange={(value) => setValue('position', value.currentKey)}
                  defaultSelectedKeys={editingUser ? [editingUser.position] : []}
                >
                  {positions?.map((position) => (
                    <SelectItem key={position.id} value={position.id}>
                      {position.name}
                    </SelectItem>
                  ))}
                </Select>
                <span className='text-red-500'>{errors.position?.message}</span>
                <Input {...register('salary')} placeholder='Salary' label='Salary' fullWidth />
                <span className='text-red-500'>{errors.salary?.message}</span>
                {isError && <span className='text-red-500'>{error?.response?.data?.message}</span>}
                <Button type='submit'>{editingUser ? 'Update User' : 'Add User'}</Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}
