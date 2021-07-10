import { query as q } from "faunadb"

const CreateUser = {
  name: "CreateUser",
  body: q.Query(
    q.Lambda(
      ["email", "netlifyId"],
      q.Create(q.Collection("User"), {
        data: {
          email: q.Var("email"),
          netlifyId: q.Var("netlifyId")
        }
      })
    )
  )
}

export default CreateUser
