'use client'

import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table'
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/modal'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useCreateCity, useDeleteCity, useGetAllCities, useUpdateCity } from '@/utils/api/city/api'
import { ICity, ICityCreateBody } from '@/utils/api/city/types'
import { formatDate } from '@/utils/lib/formatDate'

// Schema валидации с использованием Zod
const citySchema = z.object({
  name: z.string().min(1, 'Name is required'),
})

export default function CityTable() {
  const { data: cities } = useGetAllCities()
  const { mutateAsync: createCity, isError, error } = useCreateCity()
  const { mutate: deleteCity } = useDeleteCity()
  const { mutateAsync: updateCity } = useUpdateCity()
  const [editingCity, setEditingCity] = useState<any | null>(null)
  const { isOpen, onOpenChange, onOpen } = useDisclosure()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICityCreateBody>({
    resolver: zodResolver(citySchema),
  })

  const handleAdd = (data: ICityCreateBody) => {
    if (editingCity) {
      updateCity({ ...data, id: editingCity.id }).then(() => {
        reset()
        onOpenChange()
      })
    } else {
      createCity(data).then(() => {
        reset()
        onOpenChange()
      })
    }
    setEditingCity(null)
  }

  const handleEdit = (city: ICity) => {
    setEditingCity(city)
    reset(city)
    onOpen()
  }

  const handleDelete = (id: string) => {
    deleteCity(id)
  }
  useEffect(() => {
    if (!isOpen) {
      reset({ name: '' })
      setEditingCity(null)
    }
  }, [isOpen])

  return (
    <div className='w-full mt-10 flex flex-col gap-5'>
      <div className='flex items-center justify-between'>
        <h1 className='font-bold'>Cities</h1>
        <Button onClick={onOpen}>Add City</Button>
      </div>
      <Table
        aria-label='Cities Table'
        style={{
          height: 'auto',
          minWidth: '100%',
        }}
      >
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>CREATED AT</TableColumn>
          <TableColumn>UPDATED AT</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {cities?.map((city, index) => (
            <TableRow key={index}>
              <TableCell>{city.name}</TableCell>
              <TableCell>{formatDate(city.createdAt)}</TableCell>
              <TableCell>{formatDate(city.updatedAt)}</TableCell>
              <TableCell style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Button size='sm' onClick={() => handleEdit(city)}>
                  Edit
                </Button>
                <Button size='sm' onClick={() => handleDelete(city.id)}>
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
            <h3>{editingCity ? 'Edit City' : 'Add City'}</h3>
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(handleAdd)}>
              <div className='flex flex-col gap-3'>
                <Input
                  {...register('name')}
                  placeholder='City Name'
                  label='Name'
                  fullWidth
                  isClearable
                />
                {isError && <span className='text-red-500'>{error?.response?.data?.message}</span>}
                <Button type='submit'>{editingCity ? 'Update City' : 'Add City'}</Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}
