import { Card, CardBody, CardHeader } from '@heroui/card'
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { TStatistics } from '@/entities/statistics'
import { formatNumber } from '@/shared/lib/format-number'
import { ResponseWithMsg } from '@/shared/lib/types'

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

const SalaryMinMax = ({ data }: Props) => {
  const chartData = data && [
    { name: 'Минимум', value: data?.data?.salaries?.total?.min },
    { name: 'Среднее', value: data?.data?.salaries?.total?.average },
    { name: 'Максимум', value: data?.data?.salaries?.total?.max },
  ]

  return (
    <Card>
      <CardHeader>
        <h3 className="text-4xl font-light">{data?.message}</h3>
      </CardHeader>
      <CardBody>
        <ResponsiveContainer height={300} width="100%">
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

export default SalaryMinMax
