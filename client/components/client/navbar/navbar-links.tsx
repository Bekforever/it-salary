'use client';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/dropdown';
import clsx from 'clsx';
import { link as linkStyles } from '@heroui/theme';
import { siteConfig } from '@/utils/config/site';
import { NavbarItem } from '@heroui/navbar';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@heroui/button';

const NavbarLinks = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <ul className="justify-start hidden gap-4 ml-2 lg:flex">
      {siteConfig.navItems.map((item) => (
        <NavbarItem key={item.href}>
          {item.label !== 'Зарплаты' ? (
            <Button
              className={clsx(
                linkStyles({ color: 'foreground' }),
                'data-[active=true]:text-primary data-[active=true]:font-medium',
              )}
              variant={pathname === item.href ? 'faded' : 'bordered'}
              onPress={() => router.push(item.href)}
            >
              {item.label}
            </Button>
          ) : (
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant={pathname.includes(item.href) ? 'faded' : 'bordered'}
                >
                  {item.label}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                {item.children?.map((link) => (
                  <DropdownItem key={link.href}>
                    <Button
                      variant="light"
                      onPress={() => router.push(item.href + link.href)}
                    >
                      {link.label}
                    </Button>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          )}
        </NavbarItem>
      ))}
    </ul>
  );
};

export default NavbarLinks;
