import { Progress } from '@heroui/progress'

import { TStatistics } from '@/entities/statistics'
import { ResponseWithMsg } from '@/shared/lib/types'

type Props = {
  data: ResponseWithMsg<TStatistics>
}

const colors = [
  'default',
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
] as const

export const UsersByCity = ({ data }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {data?.data?.users?.usersByCity?.map((city, index) => (
        <Progress
          key={city.city}
          color={colors[index % colors.length]}
          label={`${city.city} (${city.count})`}
          maxValue={
            +data?.data?.users?.usersByCity?.sort(
              (a, b) => +b.count - +a.count,
            )[0]?.count
          }
          value={+city.count}
        />
      ))}
    </div>
  )
}
