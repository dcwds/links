import { List } from "../db/schema-types"

export type NewList = Pick<List, "name" | "description" | "isPrivate">

export type ListsState = {
  items: List[]
  loading: boolean
  error: string
}

export type ListFormState = Pick<List, "name" | "description" | "isPrivate">
