'use client'

import Link from 'next/link'
import { ReactNode } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className='px-[100px] py-5'>
      <header className='flex items-center justify-between w-full'>
        <h1>IT Salary</h1>
        <nav className='flex items-center gap-3'>
          <Link className='py-2 px-4 hover:underline bg-slate-100' href='/admin/city'>
            Города
          </Link>
          <Link className='py-2 px-4 hover:underline bg-slate-100' href='/admin/experience'>
            Опыт
          </Link>
          <Link className='py-2 px-4 hover:underline bg-slate-100' href='/admin/position'>
            Позиции
          </Link>
          <Link className='py-2 px-4 hover:underline bg-slate-100' href='/admin/user'>
            Юзеры
          </Link>
        </nav>
      </header>
      {children}
    </div>
  )
}
