'use client'
import { TStatistics } from '@/utils/api/statistics/types'
import { Card, CardBody, CardHeader } from '@heroui/card'

type Props = {
  data: TStatistics
}

const Minmax = ({ data }: Props) => {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-4xl font-light">Статистика</h3>
      </CardHeader>
      <CardBody>
        <ul>
          <li>Всего анкет: {data?.totalUsers}</li>
          <li>Минимальная зарплата: {data?.min} сум</li>
          <li>Максимальная зарплата: {data?.max} сум</li>
          <li>Средняя зарплата: {data?.average} сум</li>
        </ul>
      </CardBody>
    </Card>
  )
}

export default Minmax
