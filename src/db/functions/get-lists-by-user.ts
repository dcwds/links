import { query as q } from "faunadb"

const GetListsByUser = {
  name: "GetListsByUser",
  body: q.Query(
    q.Lambda(
      "netlifyId",
      q.Map(
        q.Paginate(
          q.Match(
            q.Index("listsByUser"),
            q.Call(q.Function("GetUserByNetlifyId"), q.Var("netlifyId"))
          )
        ),
        q.Lambda("listRef", q.Call(q.Function("GetList"), q.Var("listRef")))
      )
    )
  )
}

export default GetListsByUser
