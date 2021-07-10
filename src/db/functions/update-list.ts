import { query as q } from "faunadb"

const UpdateList = {
  name: "UpdateList",
  body: q.Query(
    q.Lambda(
      "data",
      q.Let(
        {
          list: q.Update(
            q.Ref(
              q.Match(
                q.Index("listsByUser"),
                q.Call(
                  q.Function("GetUserByNetlifyId"),
                  q.Select("netlifyId", q.Var("data"))
                )
              ),
              q.Select("id", q.Var("data"))
            ),
            {
              data: {
                name: q.Select("name", q.Var("data")),
                description: q.Select("description", q.Var("data")),
                isPrivate: q.Select("isPrivate", q.Var("data"))
              }
            }
          ),
          listRef: q.Select("ref", q.Var("list"))
        },
        q.Call(q.Function("GetList"), q.Var("listRef"))
      )
    )
  )
}

export default UpdateList
