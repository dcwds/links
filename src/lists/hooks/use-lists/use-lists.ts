import { useEffect, useState } from "react"
import { useIdentityContext } from "react-netlify-identity"
import { List as ListType } from ".././../../db/schema-types"

const useLists = () => {
  const { authedFetch } = useIdentityContext()
  const [lists, setLists] = useState<ListType[]>([])
  const [status, setStatus] = useState("idle")

  useEffect(() => {
    console.log("useLists effect called")
    setStatus("loading")
    ;(async () => {
      try {
        const fetchedLists = await authedFetch.get("/api/get-lists")

        setLists(fetchedLists)
        setStatus("done")
      } catch (e) {
        console.log(e)
        setStatus("error")
      }
    })()
  }, [authedFetch])

  return { lists, status }
}

export default useLists
