export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'IT Salary',
  description: 'Узнай зарплатные данные IT-специалистов из Узбекистана',
  navItems: [
    {
      label: 'Главная',
      href: '/',
    },
    {
      label: 'Зарплаты',
      href: '/salary',
    },
  ],
  navMenuItems: [
    {
      label: 'Главная',
      href: '/',
    },
    {
      label: 'Зарплаты',
      href: '/docs',
    },
  ],
}
