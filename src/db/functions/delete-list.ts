import { query as q } from "faunadb"

const DeleteList = {
  name: "DeleteList",
  body: q.Query(
    q.Lambda(
      "data",
      q.Let(
        {
          list: q.Delete(
            q.Ref(
              q.Match(
                q.Index("listsByUser"),
                q.Call(
                  q.Function("GetUserByNetlifyId"),
                  q.Select("netlifyId", q.Var("data"))
                )
              ),
              q.Select("id", q.Var("data"))
            )
          )
        },
        { id: q.Var("id") }
      )
    )
  )
}

export default DeleteList
