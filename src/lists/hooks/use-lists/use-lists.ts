import { useEffect, useState } from "react"
import { useIdentityContext } from "react-netlify-identity"
import { ListsState, NewList } from "../../types"

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
        console.log("fetch: lists")
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

      console.log(deletedId)

      setLists((s) => ({
        ...s,
        items: lists.items.filter(({ id }) => id !== deletedId)
      }))
    } catch (e) {
      console.log(e)
      console.log("listDelete: error")

      setLists((s) => ({
        ...s,
        error: `${name} could not be deleted. Try again.`
      }))
    }
  }

  const listAdd = async (list: NewList) => {
    try {
      const newList = await authedFetch.post("/api/create-list", {
        body: JSON.stringify(list)
      })

      console.log(newList)

      setLists((s) => ({
        ...s,
        items: [newList, ...lists.items]
      }))
    } catch (e) {
      setLists((s) => ({
        ...s,
        error: `${list.name} could not be added. Try again.`
      }))
    }
  }

  return { lists, listAdd, listDelete }
}

export default useLists
