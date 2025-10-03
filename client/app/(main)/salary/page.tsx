'use client'
import { useState } from 'react'

import Filters from '@/components/client/salary/filters'
import Minmax from '@/components/client/salary/min-max'
import { UsersByCity } from '@/components/client/salary/users-by-city'
import { useGetStatistics } from '@/utils/api/statistics/api'
import { TStatisticsFilters } from '@/utils/api/statistics/types'

export default function SalaryPage() {
  const [filters, setFilters] = useState<TStatisticsFilters>({
    city: '',
    experience: '',
    position: '',
  })
  const { data } = useGetStatistics(filters)

  if (!data) {
    return <>Loading</>
  }

  return (
    <div className="flex flex-col gap-10">
      {/* <h1 className="text-5xl">Зарплаты в IT в Узбекистане</h1> */}
      <Filters filters={filters} setFilters={setFilters} />
      <Minmax data={data} />
      <UsersByCity data={data} />
    </div>
  )
}
