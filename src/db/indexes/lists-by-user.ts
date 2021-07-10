import { query as q } from "faunadb"

const listsByUser = {
  name: "listsByUser",
  source: q.Collection("List"),
  terms: [{ field: ["data", "author"] }]
}

export default listsByUser
