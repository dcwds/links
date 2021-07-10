import faunadb from "faunadb"

const client = new faunadb.Client({
  secret: process.env.FGU_SECRET,
  domain: "localhost",
  port: 8443,
  scheme: "http"
})

const q = faunadb.query

export { client, q }
