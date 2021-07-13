import { query as q } from "faunadb"

const UpdateList = {
  name: "UpdateList",
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
          q.Do(
            q.Update(q.Select("ref", q.Var("listDoc")), {
              data: {
                name: q.Select("name", q.Var("data")),
                description: q.Select("description", q.Var("data")),
                isPrivate: q.Select("isPrivate", q.Var("data"))
              }
            }),
            q.Call(q.Function("GetList"), q.Select("ref", q.Var("listDoc")))
          ),
          {
            error: "could not find list document with this user"
          }
        )
      )
    )
  )
}

export default UpdateList
