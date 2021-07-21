import { Handler } from "@netlify/functions"
import { client, q } from "./utils/fauna"

const handler: Handler = async (event, context) => {
  const { user } = context.clientContext
  const payload = { ...JSON.parse(event.body), netlifyId: user.sub }

  try {
    const { data } = await client.query<{ data: { id: string } }>(
      q.Call(q.Function("DeleteList"), payload)
    )

    return {
      statusCode: 200,
      body: JSON.stringify(data)
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
