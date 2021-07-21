import { useEffect, useState } from "react"
import { useIdentityContext } from "react-netlify-identity"
import { List, NewList, ListsState } from "../../types"

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
        const fetchedLists = await authedFetch.get("/api/get-lists")

        setLists((s) => ({ ...s, items: fetchedLists, loading: false }))
      } catch (e) {
        console.log(e)
        setLists((s) => ({ ...s, error: "Could not fetch your lists." }))
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

  const listAdd = async (list: NewList, successCb?: () => void) => {
    try {
      const newList = await authedFetch.post("/api/create-list", {
        body: JSON.stringify(list)
      })

      setLists((s) => ({
        ...s,
        items: [newList, ...lists.items]
      }))

      if (successCb) successCb()
    } catch (e) {
      setLists((s) => ({
        ...s,
        error: `${list.name} could not be added. Try again.`
      }))
    }
  }

  const listUpdate = async (list: List, successCb?: () => void) => {
    try {
      const updatedList = await authedFetch.post("/api/update-list", {
        body: JSON.stringify(list)
      })

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
        error: `${list.name} could not be updated. Try again.`
      }))
    }
  }

  return { lists, listAdd, listDelete, listUpdate }
}

export default useLists
