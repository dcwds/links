export type List = {
  id: string
  name: string
  description?: string
  isPrivate: boolean
  createdAt: number
}

export type ListNew = Pick<List, "name" | "description" | "isPrivate">

export type ListsResponse = {
  data: ListResponse[]
}

export type ListResponse = {
  data: List
}

export type ListDeleteResponse = {
  data: {
    id: string
  }
}

export type ListsState = {
  items: List[]
  loading: boolean
  error: string
}

export type ListFormState = Pick<List, "name" | "description" | "isPrivate">
