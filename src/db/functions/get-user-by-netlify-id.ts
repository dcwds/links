import { query as q } from "faunadb"

const getUser = {
  name: "getUser",
  body: q.Query(
    q.Lambda(
      "user",
      q.Select(
        "ref",
        q.Get(q.Match(q.Index("unique_User_netlifyId"))),
        q.Var("user")
      )
    )
  )
}

export default getUser
