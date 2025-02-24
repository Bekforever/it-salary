'use client'
import { useGetAllCities } from '@/utils/api/city/api'
import { useGetAllExperiences } from '@/utils/api/experience/api'
import { useGetAllPositions } from '@/utils/api/position/api'
import { TStatisticsFilters } from '@/utils/api/statistics/types'
import { Button } from '@heroui/button'
import { Card, CardBody, CardHeader } from '@heroui/card'
import { Select, SelectItem } from '@heroui/select'
import { useState } from 'react'

type Props = {
  filters: TStatisticsFilters
  setFilters: (filters: TStatisticsFilters) => void
}

const Filters = ({ filters, setFilters }: Props) => {
  const { data: cities, isLoading: citiesLoading } = useGetAllCities()
  const { data: positions, isLoading: positionsLoading } = useGetAllPositions()
  const { data: experiences, isLoading: experiencesLoading } =
    useGetAllExperiences()

  // Локальные состояния для каждого фильтра
  const [selectedCity, setSelectedCity] = useState(
    new Set(filters.city ? [filters.city] : []),
  )
  const [selectedExperience, setSelectedExperience] = useState(
    new Set(filters.experience ? [filters.experience] : []),
  )
  const [selectedPosition, setSelectedPosition] = useState(
    new Set(filters.position ? [filters.position] : []),
  )

  const applyFilters = () => {
    setFilters({
      city: selectedCity.size ? Array.from(selectedCity)[0] : '',
      experience: selectedExperience.size
        ? Array.from(selectedExperience)[0]
        : '',
      position: selectedPosition.size ? Array.from(selectedPosition)[0] : '',
    })
  }

  const clearFilters = () => {
    setSelectedCity(new Set())
    setSelectedExperience(new Set())
    setSelectedPosition(new Set())

    setFilters({
      city: '',
      experience: '',
      position: '',
    })
  }

  return (
    <Card>
      <CardHeader>
        <h3 className="text-4xl font-light">Фильтры</h3>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <Select
            label="Выберите город"
            selectedKeys={selectedCity}
            isLoading={citiesLoading}
            onSelectionChange={(keys) =>
              setSelectedCity(new Set(Array.from(keys).map(String)))
            }
            variant="bordered"
          >
            {cities?.map((city) => (
              <SelectItem key={city.id}>{city.name}</SelectItem>
            ))}
          </Select>

          <Select
            label="Выберите опыт"
            selectedKeys={selectedExperience}
            isLoading={experiencesLoading}
            onSelectionChange={(keys) =>
              setSelectedExperience(new Set(Array.from(keys).map(String)))
            }
            variant="bordered"
          >
            {experiences?.map((experience) => (
              <SelectItem key={experience.id}>{experience.name}</SelectItem>
            ))}
          </Select>

          <Select
            label="Выберите грейд"
            selectedKeys={selectedPosition}
            isLoading={positionsLoading}
            onSelectionChange={(keys) =>
              setSelectedPosition(new Set(Array.from(keys).map(String)))
            }
            variant="bordered"
          >
            {positions?.map((position) => (
              <SelectItem key={position.id}>{position.name}</SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex gap-2 mt-4 ml-auto">
          <Button onPress={clearFilters}>Очистить фильтры</Button>
          <Button onPress={applyFilters}>Применить</Button>
        </div>
      </CardBody>
    </Card>
  )
}

export default Filters
