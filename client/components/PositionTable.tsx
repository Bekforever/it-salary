'use client'

import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table'
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/modal'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import {
  useCreatePosition,
  useDeletePosition,
  useGetAllPositions,
  useUpdatePosition,
} from '@/utils/api/position/api'
import { IPosition, IPositionCreateBody } from '@/utils/api/position/types'
import { formatDate } from '@/utils/lib/formatDate'

// Schema валидации с использованием Zod
const positionSchema = z.object({
  name: z.string().min(1, 'Name is required'),
})

export default function PositionTable() {
  const { data: cities, isLoading } = useGetAllPositions()
  const { mutateAsync: createPosition, isError, error } = useCreatePosition()
  const { mutate: deletePosition } = useDeletePosition()
  const { mutateAsync: updatePosition } = useUpdatePosition()
  const [editingPosition, setEditingPosition] = useState<any | null>(null)
  const { isOpen, onOpenChange, onOpen } = useDisclosure()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IPositionCreateBody>({
    resolver: zodResolver(positionSchema),
  })

  const handleAdd = (data: IPositionCreateBody) => {
    if (editingPosition) {
      updatePosition({ ...data, id: editingPosition.id }).then(() => {
        reset()
        onOpenChange()
      })
    } else {
      createPosition(data).then(() => {
        reset()
        onOpenChange()
      })
    }
    setEditingPosition(null)
  }

  const handleEdit = (position: IPosition) => {
    setEditingPosition(position)
    reset(position)
    onOpen()
  }

  const handleDelete = (id: string) => {
    deletePosition(id)
  }
  useEffect(() => {
    if (!isOpen) {
      reset({ name: '' })
      setEditingPosition(null)
    }
  }, [isOpen])

  return (
    <div className='w-full mt-10 flex flex-col gap-5'>
      <div className='flex items-center justify-between'>
        <h1 className='font-bold'>Positions</h1>
        <Button onClick={onOpen}>Add Position</Button>
      </div>
      <Table
        aria-label='Positions Table'
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
        <TableBody isLoading={isLoading}>
          {cities?.map((position, index) => (
            <TableRow key={index}>
              <TableCell>{position.name}</TableCell>
              <TableCell>{formatDate(position.createdAt)}</TableCell>
              <TableCell>{formatDate(position.updatedAt)}</TableCell>
              <TableCell style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Button size='sm' onClick={() => handleEdit(position)}>
                  Edit
                </Button>
                <Button size='sm' onClick={() => handleDelete(position.id)}>
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
            <h3>{editingPosition ? 'Edit Position' : 'Add Position'}</h3>
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(handleAdd)}>
              <div className='flex flex-col gap-3'>
                <Input
                  {...register('name')}
                  placeholder='Position Name'
                  label='Name'
                  fullWidth
                  isClearable
                />
                {isError && <span className='text-red-500'>{error?.response?.data?.message}</span>}
                <Button type='submit'>
                  {editingPosition ? 'Update Position' : 'Add Position'}
                </Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}
