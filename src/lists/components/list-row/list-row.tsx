import { useState, FC } from "react"
import styled from "styled-components"
import ListForm from "../list-form"
import { List } from "../../types"

const StyledWrapper = styled.div.attrs({
  "aria-label": "list"
})`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0.5em 0;
`

const StyledName = styled.h2`
  font-size: 1.25em;
  font-weight: 600;

  /* todo: fix this nasty stuff later */
  margin: 0;
  padding: 0;
`

const StyledActions = styled.div`
  display: flex;
`

const StyledDescription = styled.p`
  margin: 0.5em 0;
`
type Props = {
  list: List
  listUpdate: (list: List, successCb?: () => void) => Promise<void>
  listDelete: (name: string, id: string) => Promise<void>
}

const ListRow: FC<Props> = ({ list, listDelete, listUpdate }) => {
  const [updating, setUpdating] = useState(false)

  return updating ? (
    <ListForm
      listToUpdate={list}
      listUpdate={listUpdate}
      setUpdating={setUpdating}
    />
  ) : (
    <StyledWrapper>
      <StyledName>{list.name}</StyledName>
      {!!list.description?.length && (
        <StyledDescription>{list.description}</StyledDescription>
      )}
      <StyledActions>
        <button onClick={() => setUpdating(true)}>Update</button>
        <button onClick={() => listDelete(list.name, list.id)}>Delete</button>
      </StyledActions>
    </StyledWrapper>
  )
}

export default ListRow
