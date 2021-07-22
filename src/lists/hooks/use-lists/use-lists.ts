import { useEffect, useState } from "react"
import { useIdentityContext } from "react-netlify-identity"
import { List, ListsResponse, ListNew, ListsState } from "../../types"

const useLists = () => {
  const { authedFetch } = useIdentityContext()
  const [lists, setLists] = useState<ListsState>({
    items: [],
    loading: true,
    error: ""
  })

  useEffect(() => {
    ;(async () => {
      try {
        const { data: fetchedLists } = (await authedFetch.get(
          "/api/get-lists"
        )) as ListsResponse

        if (!fetchedLists) throw new Error("Could not fetch your lists.")

        setLists((s) => ({
          ...s,
          items: fetchedLists.map(({ data }) => data),
          loading: false
        }))
      } catch (e) {
        setLists((s) => ({
          ...s,
          loading: false,
          error: e.message
        }))
      }
    })()
  }, [authedFetch])

  const listDelete = async (name: string, id: string) => {
    try {
      const { id: deletedId } = await authedFetch.post("/api/delete-list", {
        body: JSON.stringify({
          id
        })
      })

      setLists((s) => ({
        ...s,
        items: lists.items.filter(({ id }) => id !== deletedId)
      }))
    } catch (e) {
      setLists((s) => ({
        ...s,
        error: `${name} could not be deleted. Try again.`
      }))
    }
  }

  const listAdd = async (list: ListNew, successCb?: () => void) => {
    try {
      const { data: newList } = await authedFetch.post("/api/create-list", {
        body: JSON.stringify(list)
      })

      if (!newList)
        throw new Error(`${list.name} could not be added. Try again.`)

      setLists((s) => ({
        ...s,
        items: [newList, ...lists.items]
      }))

      if (successCb) successCb()
    } catch (e) {
      setLists((s) => ({
        ...s,
        error: e.message
      }))
    }
  }

  const listUpdate = async (list: List, successCb?: () => void) => {
    try {
      const { data: updatedList } = await authedFetch.post("/api/update-list", {
        body: JSON.stringify(list)
      })

      if (!updatedList)
        throw new Error(`${list.name} could not be updated. Try again.`)

      setLists((s) => ({
        ...s,
        items: lists.items.map((l) =>
          l.id === updatedList.id ? updatedList : l
        )
      }))

      if (successCb) successCb()
    } catch (e) {
      setLists((s) => ({
        ...s,
        error: e.message
      }))
    }
  }

  return { lists, listAdd, listDelete, listUpdate }
}

export default useLists
