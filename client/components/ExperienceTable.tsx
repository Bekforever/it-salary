'use client'

import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table'
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/modal'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { IExperience, IExperienceCreateBody } from '@/utils/api/experience/types'
import { formatDate } from '@/utils/lib/formatDate'
import {
  useCreateExperience,
  useDeleteExperience,
  useGetAllExperiences,
  useUpdateExperience,
} from '@/utils/api/experience/api'

// Schema валидации с использованием Zod
const experienceSchema = z.object({
  name: z.string().min(1, 'Name is required'),
})

export default function ExperienceTable() {
  const { data: experiences } = useGetAllExperiences()
  const { mutateAsync: createExperience, isError, error } = useCreateExperience()
  const { mutate: deleteExperience } = useDeleteExperience()
  const { mutateAsync: updateExperience } = useUpdateExperience()
  const [editingExperience, setEditingExperience] = useState<any | null>(null)
  const { isOpen, onOpenChange, onOpen } = useDisclosure()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IExperienceCreateBody>({
    resolver: zodResolver(experienceSchema),
  })

  const handleAdd = (data: IExperienceCreateBody) => {
    if (editingExperience) {
      updateExperience({ ...data, id: editingExperience.id }).then(() => {
        reset()
        onOpenChange()
      })
    } else {
      createExperience(data).then(() => {
        reset()
        onOpenChange()
      })
    }
    setEditingExperience(null)
  }

  const handleEdit = (experience: IExperience) => {
    setEditingExperience(experience)
    reset(experience)
    onOpen()
  }

  const handleDelete = (id: string) => {
    deleteExperience(id)
  }
  useEffect(() => {
    if (!isOpen) {
      reset({ name: '' })
      setEditingExperience(null)
    }
  }, [isOpen])

  return (
    <div className='w-full mt-10 flex flex-col gap-5'>
      <div className='flex items-center justify-between'>
        <h1 className='font-bold'>Experiences</h1>
        <Button onClick={onOpen}>Add Experience</Button>
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
          {experiences?.map((experience, index) => (
            <TableRow key={index}>
              <TableCell>{experience.name}</TableCell>
              <TableCell>{formatDate(experience.createdAt)}</TableCell>
              <TableCell>{formatDate(experience.updatedAt)}</TableCell>
              <TableCell style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Button size='sm' onClick={() => handleEdit(experience)}>
                  Edit
                </Button>
                <Button size='sm' onClick={() => handleDelete(experience.id)}>
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
            <h3>{editingExperience ? 'Edit Experience' : 'Add Experience'}</h3>
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(handleAdd)}>
              <div className='flex flex-col gap-3'>
                <Input
                  {...register('name')}
                  placeholder='Experience Name'
                  label='Name'
                  fullWidth
                  isClearable
                />
                {isError && <span className='text-red-500'>{error?.response?.data?.message}</span>}
                <Button type='submit'>
                  {editingExperience ? 'Update Experience' : 'Add Experience'}
                </Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}
