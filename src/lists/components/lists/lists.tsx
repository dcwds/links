import useLists from "../../hooks/use-lists"
import ListRow from "../list-row"

const Lists = () => {
  const { items, loading, error } = useLists()

  return (
    <div>
      <h1>Lists</h1>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {items && (
        <>
          {items.map((item) => (
            <ListRow key={item.id} {...item} />
          ))}
        </>
      )}
    </div>
  )
}

export default Lists
