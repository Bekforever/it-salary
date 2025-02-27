'use client'
import { TStatistics } from '@/utils/api/statistics/types'
import { formatNumber } from '@/utils/lib/formatNumber'
import { ResponseWithMsg } from '@/utils/lib/types'
import { Card, CardBody, CardHeader } from '@heroui/card'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

type Props = {
  data: ResponseWithMsg<TStatistics>
}

// Кастомный Tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-white rounded-md shadow-md">
        <p className="font-semibold text-gray-700">{payload[0].payload.name}</p>
        <p className="text-gray-900">
          Количество: {formatNumber(payload[0].value)} сум
        </p>
      </div>
    )
  }
  return null
}

const Minmax = ({ data }: Props) => {
  const chartData = data && [
    { name: 'Минимум', value: data?.data?.salaries.min },
    { name: 'Среднее', value: data?.data?.salaries.average },
    { name: 'Максимум', value: data?.data?.salaries.max },
  ]

  return (
    <Card>
      <CardHeader>
        <h3 className="text-4xl font-light">{data?.message}</h3>
      </CardHeader>
      <CardBody>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'transparent' }}
            />
            <Bar dataKey="value" fill="#8884d8" radius={[16, 16, 0, 0]}>
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill="#8884d8" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  )
}

export default Minmax
