import { Handler } from "@netlify/functions"
import { ListsResponse } from "../src/lists/types"
import { client, q } from "./utils/fauna"

const handler: Handler = async (_, context) => {
  const { user } = context.clientContext

  try {
    const lists = await client.query<ListsResponse>(
      q.Call(q.Function("GetListsByUser"), user.sub)
    )

    return {
      statusCode: 200,
      body: JSON.stringify(lists)
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
