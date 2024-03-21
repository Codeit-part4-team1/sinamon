import { GetActivitiesPayload } from './activities.type'
import { request } from './request'

export const getActivities = ({
  page, 
  size,
  method,
  cursorId,
}: GetActivitiesPayload) => {
  return request.get('activities', { params: { page, size, method, cursorId } })
}