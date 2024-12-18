'use client'
import Cookies from 'js-cookie'
import { NavbarItem } from '@nextui-org/navbar'
import { Button } from '@nextui-org/button'
import { TOKEN } from '@/utils/config/constants'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'

const NavbarUser = () => {
  const [token, setToken] = useState('')

  useEffect(() => {
    const token = Cookies.get(TOKEN)
    if (token?.length) {
      setToken(token)
    }
  }, [])

  return (
    <div className='flex items-center gap-3'>
      {token.length ? (
        <NavbarItem className='hidden lg:flex'>
          <Button
            as={NextLink}
            href='/'
            className='text-sm font-normal text-default-600 bg-default-100'
            variant='flat'
          >
            Профиль
          </Button>
        </NavbarItem>
      ) : (
        <>
          <NavbarItem className='hidden lg:flex'>
            <Button
              as={NextLink}
              href='/sign_in'
              className='text-sm font-normal text-default-600 bg-default-100'
              variant='flat'
            >
              Войти
            </Button>
          </NavbarItem>
          <NavbarItem className='hidden md:flex'>
            <Button
              as={NextLink}
              href='/sign_up'
              className='text-sm font-normal text-default-600 bg-default-100'
              variant='flat'
            >
              Регистрация
            </Button>
          </NavbarItem>
        </>
      )}
    </div>
  )
}

export default NavbarUser
