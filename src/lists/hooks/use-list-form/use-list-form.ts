import { useCallback, useEffect, useState, ChangeEvent } from "react"
import { ListFormState } from "../../types"

const defaultListFormState: ListFormState = {
  name: "",
  description: "",
  isPrivate: true
}

const useListForm = () => {
  const [list, setList] = useState<ListFormState>(defaultListFormState)
  const [valid, setValid] = useState<boolean>(false)

  // client-side validation
  const isValid = useCallback(() => !!list.name, [list])

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setList((s) => ({ ...s, name: e.target.value }))
  const onDescriptionChange = (e: ChangeEvent<HTMLInputElement>) =>
    setList((s) => ({ ...s, description: e.target.value }))
  const onPrivateChange = (e: ChangeEvent<HTMLInputElement>) =>
    setList((s) => ({ ...s, isPrivate: e.target.checked }))

  const resetForm = () => {
    setList(defaultListFormState)
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
