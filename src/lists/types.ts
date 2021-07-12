export type List = {
  id: string
  name: string
  description?: string
  isPrivate: boolean
  createdAt: number
}

export type NewList = Pick<List, "name" | "description" | "isPrivate">

export type ListsState = {
  items: List[]
  loading: boolean
  error: string
}

export type ListFormState = Pick<List, "name" | "description" | "isPrivate">
