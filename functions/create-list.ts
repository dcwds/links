import { Handler } from "@netlify/functions"
import { client, q } from "./utils/fauna"

const handler: Handler = async (event, context) => {
  const { user } = context.clientContext
  const params = event.queryStringParameters

  try {
    const response = await client.query(
      q.Call(
        q.Function("CreateList"),
        params.name,
        params.description || "",
        Boolean(params.isPrivate),
        user.sub
      )
    )

    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
  } catch (e) {
    console.log(e)
    return {
      statusCode: e.statusCode || 500,
      body: JSON.stringify({
        error: e.message
      })
    }
  }
}

export { handler }
