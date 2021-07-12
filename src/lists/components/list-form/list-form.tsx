import { FC, Dispatch, SetStateAction } from "react"
import useListForm from "../../hooks/use-list-form"
import { List, NewList } from "../../types"

type Props = {
  listToUpdate?: List
  listAdd?: (list: NewList, successCb?: () => void) => Promise<void>
  listUpdate?: (list: List, successCb?: () => void) => Promise<void>
  setUpdating?: Dispatch<SetStateAction<boolean>>
}

const ListForm: FC<Props> = ({
  listToUpdate,
  listAdd,
  listUpdate,
  setUpdating
}) => {
  const {
    list,
    valid,
    onNameChange,
    onDescriptionChange,
    onPrivateChange,
    resetForm
  } = useListForm(listToUpdate ? listToUpdate : null)

  return (
    <div>
      {listAdd && <h2>Add List</h2>}
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
      {listAdd && (
        <button
          disabled={!valid}
          onClick={() =>
            listAdd(list, () => {
              resetForm()
            })
          }
        >
          Add
        </button>
      )}
      {listUpdate && listToUpdate && setUpdating && (
        <button
          disabled={!valid}
          onClick={() =>
            listUpdate({ ...listToUpdate, ...list }, () => {
              setUpdating(false)
            })
          }
        >
          Update
        </button>
      )}
    </div>
  )
}

export default ListForm
