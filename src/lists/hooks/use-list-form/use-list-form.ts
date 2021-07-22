import { useCallback, useEffect, useState, ChangeEvent } from "react"
import { List, ListFormState } from "../../types"

const useListForm = (listToUpdate: List | null) => {
  let initialState: ListFormState = {
    name: "",
    description: "",
    isPrivate: true
  }

  if (listToUpdate) {
    const { id, createdAt, ...rest } = listToUpdate

    initialState = rest
  }

  const [list, setList] = useState<ListFormState>(initialState)
  const [valid, setValid] = useState<boolean>(false)

  // client-side validation
  const isValid = useCallback(() => !!list.name, [list])

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    // declaring `value` as variable is necessary
    // see: https://github.com/testing-library/user-event/issues/387#issuecomment-819761470
    const value = e.target.value
    setList((s) => ({ ...s, name: value }))
  }
  const onDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setList((s) => ({ ...s, description: value }))
  }

  const onPrivateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    setList((s) => ({ ...s, isPrivate: checked }))
  }

  const resetForm = () => {
    setList(initialState)
    setValid(false)
  }

  useEffect(() => {
    if (isValid()) setValid(true)
    else setValid(false)
  }, [isValid])

  return {
    list,
    valid,
    onNameChange,
    onDescriptionChange,
    onPrivateChange,
    resetForm
  }
}

export default useListForm
