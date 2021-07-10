import { query as q } from "faunadb"

const GetUserByNetlifyId = {
  name: "GetUserByNetlifyId",
  body: q.Query(
    q.Lambda(
      "netlifyId",
      q.Select(
        "ref",
        q.Get(q.Match(q.Index("unique_User_netlifyId"), q.Var("netlifyId")))
      )
    )
  )
}

export default GetUserByNetlifyId
