import { FC } from "react"
import { List as ListType } from "../../../db/schema-types"
import styled from "styled-components"

const StyledWrapper = styled.div`
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

const StyledDescription = styled.p`
  margin: 0.5em 0;
`

const ListRow: FC<ListType> = ({ id, name, description, isPrivate }) => (
  <StyledWrapper>
    <StyledName>{name}</StyledName>
    {!!description?.length && (
      <StyledDescription>{description}</StyledDescription>
    )}
  </StyledWrapper>
)

export default ListRow
