import { query as q } from "faunadb"

const CreateList = {
  name: "CreateList",
  body: q.Query(
    q.Lambda(
      ["name", "description", "isPrivate", "netlifyId"],
      q.Create(q.Collection("List"), {
        data: {
          name: q.Var("name"),
          description: q.Var("description"),
          isPrivate: q.Var("isPrivate"),
          author: q.Call(q.Function("GetUserByNetlifyId"), q.Var("netlifyId"))
        }
      })
    )
  )
}

export default CreateList
