export type User = {
  email: string
  netlifyId: string
}

export type Link = {
  id: number
  name?: string
  url: string
  isRead: boolean
  createdAt: number
}

export type List = {
  id: number
  name: string
  description?: string
  isPrivate: boolean
  createdAt: number
}
