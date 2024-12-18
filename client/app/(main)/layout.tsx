import Navbar from '@/components/navbar'
import '@/styles/globals.css'
import { Link } from '@nextui-org/link'

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative flex flex-col h-screen'>
      <Navbar />
      <main className='container mx-auto max-w-7xl pt-16 px-6 flex-grow'>{children}</main>
      <footer className='w-full flex items-center justify-center py-3'>
        <Link
          isExternal
          className='flex items-center gap-1 text-current'
          href='https://github.com/vorpal13'
          title='github vorpal13'
        >
          <span className='text-default-600'>Developed by</span>
          <p className='text-primary'>Vorpal13</p>
        </Link>
      </footer>
    </div>
  )
}
