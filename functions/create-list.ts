import { Handler } from "@netlify/functions"
import { ListResponse } from "../src/lists/types"
import { client, q } from "./utils/fauna"

const handler: Handler = async (event, context) => {
  const { user } = context.clientContext
  const payload = { ...JSON.parse(event.body), netlifyId: user.sub }

  try {
    const list = await client.query<ListResponse>(
      q.Call(q.Function("CreateList"), payload)
    )

    return {
      statusCode: 200,
      body: JSON.stringify(list)
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
