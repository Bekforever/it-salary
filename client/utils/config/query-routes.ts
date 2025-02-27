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
    getAll: '/experience',
    getOne: (id: string) => `/experience/${id}`,
    create: '/experience',
    update: (id: string) => `/experience/${id}`,
    delete: (id: string) => `/experience/${id}`,
  },
  position: {
    getAll: '/position',
    getOne: (id: string) => `/position/${id}`,
    create: '/position',
    update: (id: string) => `/position/${id}`,
    delete: (id: string) => `/position/${id}`,
  },
  user: {
    getAll: '/users',
    getOne: (id: string) => `/users/${id}`,
    create: '/users',
    update: (id: string) => `/users/${id}`,
    delete: (id: string) => `/users/${id}`,
  },
  location: {
    getAll: '/location',
    getOne: (id: string) => `/location/${id}`,
    create: '/location',
    update: (id: string) => `/location/${id}`,
    delete: (id: string) => `/location/${id}`,
  },
  company: {
    getAll: '/company',
    getOne: (id: string) => `/company/${id}`,
    create: '/company',
    update: (id: string) => `/company/${id}`,
    delete: (id: string) => `/company/${id}`,
  },
  statistics: {
    getAll: '/statistics',
  },
}
