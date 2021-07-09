export type User = {
  email: string
  netlifyId: string
  links: Link[]
  lists: List[]
}

export type Link = {
  name?: string
  url: string
  author: User
  isRead: boolean
  list: List
}

export type List = {
  name: string
  description?: string
  isPrivate: boolean
  links: Link[]
  author: User
}
