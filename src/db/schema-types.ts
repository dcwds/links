export type User = {
  email: string
  netlifyId: string
}

export type Link = {
  id: string
  name?: string
  url: string
  isRead: boolean
  createdAt: number
}
