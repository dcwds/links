import { Handler } from "@netlify/functions"
import { client, q } from "./utils/fauna"

const handler: Handler = async (_, context) => {
  const { user } = context.clientContext

  try {
    const response = await client.query(
      q.Call(q.Function("GetListsByUser"), user.sub)
    )

    console.log(JSON.stringify(response))

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
