import { query as q } from "faunadb"

const DeleteList = {
  name: "DeleteList",
  body: q.Query(
    q.Lambda(
      "data",
      q.Let(
        {
          listDoc: q.Get(
            q.Ref(q.Collection("List"), q.Select("id", q.Var("data")))
          )
        },
        q.If(
          q.Equals(
            q.Select(["data", "author"], q.Var("listDoc")),
            q.Call(
              q.Function("GetUserByNetlifyId"),
              q.Select("netlifyId", q.Var("data"))
            )
          ),
          q.Let(
            {
              list: q.Delete(q.Select("ref", q.Var("listDoc")))
            },
            { id: q.Select("id", q.Var("data")) }
          ),
          {
            error: "could not find list document with this user"
          }
        )
      )
    )
  )
}

export default DeleteList
