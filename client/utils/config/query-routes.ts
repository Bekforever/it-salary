export const queryRoutes = {
  auth: {
    login: '/login',
    getMe: '/get_me',
  },
  city: {
    getAll: '/city',
    getOne: (id: string) => `/city/${id}`,
    create: '/city',
    update: (id: string) => `/city/${id}`,
    delete: (id: string) => `/city/${id}`,
  },
  experience: {
    getAll: '/experiences',
    getOne: (id: string) => `/experiences/${id}`,
    create: '/experiences',
    update: (id: string) => `/experiences/${id}`,
    delete: (id: string) => `/experiences/${id}`,
  },
  position: {
    getAll: '/positions',
    getOne: (id: string) => `/positions/${id}`,
    create: '/positions',
    update: (id: string) => `/positions/${id}`,
    delete: (id: string) => `/positions/${id}`,
  },
  user: {
    getAll: '/users',
    getOne: (id: string) => `/users/${id}`,
    create: '/users',
    update: (id: string) => `/users/${id}`,
    delete: (id: string) => `/users/${id}`,
  },
}
