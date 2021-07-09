import { Handler } from "@netlify/functions"
import { client, q } from "./utils/fauna"

const handler: Handler = async (event, context) => {
  const { user } = context.clientContext
  const params = event.queryStringParameters

  try {
    const response = await client.query(
      q.Create(q.Collection("List"), {
        data: {
          name: params.name,
          description: params.description || "",
          isPrivate: Boolean(params.isPrivate),
          author: q.Call(q.Function("getUser"), user.sub)
        }
      })
    )

    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
  } catch (e) {
    return {
      statusCode: e.statusCode || 500,
      body: JSON.stringify({
        error: e.message
      })
    }
  }
}

export { handler }
