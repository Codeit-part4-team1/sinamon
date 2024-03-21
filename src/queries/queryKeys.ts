export const activitiesQueryKey = {
  default: ['activities'],
  // ['activities, page, size]
  getList: (method: 'offset' | 'cursor', page?: number, size?: number) => [...activitiesQueryKey.default, method, page, size ],
  getById: (id: string) => [...activitiesQueryKey.default, id]
}

