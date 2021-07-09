import faunadb from "faunadb"
import { Handler } from "@netlify/functions"

const q = faunadb.query

const handler: Handler = async (_, context) => {
  const { user } = context.clientContext
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_LOCAL_SECRET,
    domain: "localhost",
    port: 8443,
    scheme: "http"
  })

  try {
    const response = await client.query(
      q.Create(q.Collection("User"), {
        data: {
          email: user.email,
          netlifyId: user.sub
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
