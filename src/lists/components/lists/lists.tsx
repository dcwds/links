import useLists from "../../hooks/use-lists"
import ListRow from "../list-row"
import ListForm from "../list-form"

const Lists = () => {
  const { lists, listAdd, listDelete } = useLists()
  const { items, loading, error } = lists

  return (
    <div>
      <h1>Lists</h1>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <ListForm listAdd={listAdd} />

      {items && (
        <>
          {items.map((item) => (
            <ListRow key={item.id} {...item} listDelete={listDelete} />
          ))}
        </>
      )}
    </div>
  )
}

export default Lists
