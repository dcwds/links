import { query as q } from "faunadb"

const DeleteAll = {
  name: "DeleteAll",
  body: q.Query(
    q.Do(
      q.Map(q.Collection("User"), q.Lambda("ref", q.Delete(q.Var("ref")))),
      q.Map(q.Collection("List"), q.Lambda("ref", q.Delete(q.Var("ref")))),
      q.Map(q.Collection("Link"), q.Lambda("ref", q.Delete(q.Var("ref"))))
    )
  )
}

export default DeleteAll
