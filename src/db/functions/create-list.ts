import { query as q } from "faunadb"

const CreateList = {
  name: "CreateList",
  body: q.Query(
    q.Lambda(
      ["name", "description", "isPrivate", "netlifyId"],
      q.Let(
        {
          list: q.Create(q.Collection("List"), {
            data: {
              name: q.Var("name"),
              description: q.Var("description"),
              isPrivate: q.Var("isPrivate"),
              author: q.Call(
                q.Function("GetUserByNetlifyId"),
                q.Var("netlifyId")
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
