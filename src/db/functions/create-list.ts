import { query as q } from "faunadb"

const CreateList = {
  name: "CreateList",
  body: q.Query(
    q.Lambda(
      "data",
      q.Let(
        {
          list: q.Create(q.Collection("List"), {
            data: {
              name: q.Select("name", q.Var("data")),
              description: q.Select("description", q.Var("data")),
              isPrivate: q.Select("isPrivate", q.Var("data")),
              author: q.Call(
                q.Function("GetUserByNetlifyId"),
                q.Select("netlifyId", q.Var("data"))
              ),
              createdAt: q.Now()
            }
          }),
          listRef: q.Select("ref", q.Var("list"))
        },
        q.Call(q.Function("GetList"), q.Var("listRef"))
      )
    )
  )
}

export default CreateList
