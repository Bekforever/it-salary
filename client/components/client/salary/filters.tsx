'use client'
import { useGetAllCities } from '@/utils/api/city/api'
import { useGetAllExperiences } from '@/utils/api/experience/api'
import { useGetAllPositions } from '@/utils/api/position/api'
import { Card, CardBody, CardHeader } from '@heroui/card'
import { Select, SelectItem } from '@heroui/select'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  filters: any
  setFilters: Dispatch<SetStateAction<any>>
}

const Filters = ({ filters, setFilters }: Props) => {
  const { data: cities } = useGetAllCities()
  const { data: experiences } = useGetAllExperiences()
  const { data: positions } = useGetAllPositions()

  return (
    <Card>
      <CardHeader>
        <h3 className="text-4xl font-light">Фильтры</h3>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <Select
            label="Выберите город"
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          >
            {cities?.map((city) => (
              <SelectItem key={city.id}>{city.name}</SelectItem>
            ))}
          </Select>
          <Select
            label="Выберите опыт"
            onChange={(e) =>
              setFilters({ ...filters, experience: e.target.value })
            }
          >
            {experiences?.map((experience) => (
              <SelectItem key={experience.id}>{experience.name}</SelectItem>
            ))}
          </Select>
          <Select
            label="Выберите грейд"
            onChange={(e) =>
              setFilters({ ...filters, position: e.target.value })
            }
          >
            {positions?.map((position) => (
              <SelectItem key={position.id}>{position.name}</SelectItem>
            ))}
          </Select>
        </div>
      </CardBody>
    </Card>
  )
}

export default Filters
