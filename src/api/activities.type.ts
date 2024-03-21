export interface GetActivitiesPayload {
  page?: number
  size?: number
  method: 'offset' | 'cursor'
  cursorId: number | null
}