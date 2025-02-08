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
      children: [
        {
          label: 'Статистика по зарплатам',
          href: '/',
        },
        {
          label: 'Опросник',
          href: '/survey',
        },
        {
          label: 'История зарплат',
          href: '/history',
        },
      ],
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
};
