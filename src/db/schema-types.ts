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

export type List = {
  id: string
  name: string
  description?: string
  isPrivate: boolean
  createdAt: number
}
