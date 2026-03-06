'use client'
import Cookies from 'js-cookie'
import { NavbarItem } from '@heroui/navbar'
import { Button } from '@heroui/button'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'

import { TOKEN } from '@/shared/config/constants'

const NavbarUser = () => {
  const [token, setToken] = useState('')

  useEffect(() => {
    const token = Cookies.get(TOKEN)

    if (token?.length) {
      setToken(token)
    }
  }, [])

  return (
    <div className="flex items-center gap-3">
      {token.length ? (
        <NavbarItem className="hidden lg:flex">
          <Button
            as={NextLink}
            className="text-sm font-normal text-default-600 bg-default-100"
            href="/"
            variant="flat"
          >
            Профиль
          </Button>
        </NavbarItem>
      ) : (
        <>
          <NavbarItem className="hidden lg:flex">
            <Button
              as={NextLink}
              className="text-sm font-normal text-default-600 bg-default-100"
              href="/sign_in"
              variant="flat"
            >
              Войти
            </Button>
          </NavbarItem>
          <NavbarItem className="hidden md:flex">
            <Button
              as={NextLink}
              className="text-sm font-normal text-default-600 bg-default-100"
              href="/sign_up"
              variant="flat"
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
