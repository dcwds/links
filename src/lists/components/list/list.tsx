import { FC } from "react"
import { List as ListType } from "../../../db/schema-types"

const List: FC<ListType> = ({ id, name, description, isPrivate }) => (
  <div>
    <h2>{name}</h2>
    <p>{description}</p>
  </div>
)

export default List
