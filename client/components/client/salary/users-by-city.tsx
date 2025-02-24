import { TStatistics } from '@/utils/api/statistics/types'
import { ResponseWithMsg } from '@/utils/lib/types'
import { Progress } from '@heroui/progress'

type Props = {
  data: ResponseWithMsg<TStatistics>
}
export const UsersByCity = ({ data }: Props) => {
  return (
    <div>
      <Progress aria-label="Loading..." color="default" value={70} />
      <Progress aria-label="Loading..." color="primary" value={70} />
      <Progress aria-label="Loading..." color="secondary" value={70} />
      <Progress aria-label="Loading..." color="success" value={70} />
      <Progress aria-label="Loading..." color="warning" value={70} />
      <Progress aria-label="Loading..." color="danger" value={70} />
    </div>
  )
}
