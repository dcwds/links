import useLists from "../../hooks/use-lists"
import List from "../list"

const Lists = () => {
  const { lists, status } = useLists()

  console.log("lists rendered")

  return (
    <div>
      {
        {
          loading: <div>Loading</div>,
          error: <div>Error</div>,
          done: (
            <>
              {lists.map((l) => (
                <List key={l.id} {...l} />
              ))}
            </>
          )
        }[status]
      }
    </div>
  )
}

export default Lists
