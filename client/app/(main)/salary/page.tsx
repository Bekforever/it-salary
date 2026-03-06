'use client'
import { useState } from 'react'

import { SalaryFilters } from '@/features/salary/filters'
import { SalaryMinMax, UsersByCity } from '@/widgets/salary-stats'
import { useGetStatistics, TStatisticsFilters } from '@/entities/statistics'

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
      <SalaryFilters filters={filters} setFilters={setFilters} />
      <SalaryMinMax data={data} />
      <UsersByCity data={data} />
    </div>
  )
}
