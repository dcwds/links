import { query as q } from "faunadb"

const GetList = {
  name: "GetList",
  body: q.Query(
    q.Lambda(
      "listRef",
      q.Let(
        {
          listDoc: q.Get(q.Var("listRef"))
        },
        {
          data: {
            id: q.Select(["ref", "id"], q.Var("listDoc")),
            name: q.Select(["data", "name"], q.Var("listDoc")),
            description: q.Select(["data", "description"], q.Var("listDoc")),
            isPrivate: q.Select(["data", "isPrivate"], q.Var("listDoc")),
            createdAt: q.ToMillis(
              q.Select(["data", "createdAt"], q.Var("listDoc"))
            )
          }
        }
      )
    )
  )
}

export default GetList
