import { query as q } from "faunadb"

const CreateUser = {
  name: "CreateUser",
  body: q.Query(
    q.Lambda(
      ["email", "netlifyId"],
      q.Do(
        q.Create(q.Collection("User"), {
          data: {
            email: q.Var("email"),
            netlifyId: q.Var("netlifyId")
          }
        }),
        { msg: "successfully created user" }
      )
    )
  )
}

export default CreateUser
