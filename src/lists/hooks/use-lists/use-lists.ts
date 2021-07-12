import { useEffect, useState } from "react"
import { useIdentityContext } from "react-netlify-identity"
import { List as ListType } from ".././../../db/schema-types"

const useLists = () => {
  const { authedFetch } = useIdentityContext()
  const [lists, setLists] = useState<{
    items: ListType[]
    loading: boolean
    error: string
  }>({ items: [], loading: true, error: "" })

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

  return lists
}

export default useLists
