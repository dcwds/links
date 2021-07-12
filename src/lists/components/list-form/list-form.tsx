import { FC } from "react"
import useListForm from "../../hooks/use-list-form"
import { NewList } from "../../types"

type Props = {
  listAdd: (list: NewList) => Promise<void>
}

const ListForm: FC<Props> = ({ listAdd }) => {
  const {
    list,
    valid,
    onNameChange,
    onDescriptionChange,
    onPrivateChange,
    resetForm
  } = useListForm()

  return (
    <div>
      <h2>Add List</h2>
      <div>
        <input
          type="text"
          name="name"
          aria-label="add-list-name"
          placeholder="Name..."
          value={list.name}
          onChange={(e) => onNameChange(e)}
        />
        <input
          type="text"
          name="description"
          aria-label="add-list-description"
          placeholder="Description..."
          value={list.description}
          onChange={(e) => onDescriptionChange(e)}
        />
        <div>
          <input
            type="checkbox"
            defaultChecked={list.isPrivate}
            name="isPrivate"
            aria-label="add-list-is-private"
            onChange={(e) => onPrivateChange(e)}
          />
          Keep this list private.
        </div>
      </div>
      <button disabled={!valid} onClick={() => listAdd(list) && resetForm()}>
        Add
      </button>
    </div>
  )
}

export default ListForm
