import faunadb, { Client } from "faunadb"
import createTestDB from "../scripts/createTestDB"
import deleteTestDB from "../scripts/deleteTestDB"

const q = faunadb.query

describe("db", () => {
  let dbName: string | null = null
  let dbClient: Client | null = null

  beforeEach(async () => {
    dbName = `test-db-${process.env.JEST_WORKER_ID}`
    const { payload: client } = await createTestDB(dbName)

    if (client) dbClient = client as Client

    return client
  }, 20000)

  afterEach(() => {
    dbClient?.query(q.Call(q.Function("DeleteAll")))
  })

  afterAll(async () => {
    if (dbName) await deleteTestDB(dbName)
  })

  test("gets anything", async () => {
    return expect(
      dbClient?.query(
        q.Call(q.Function("CreateUser"), "user@cooldomain.com", "somenetlifyid")
      )
    ).resolves.toEqual({})
  }, 20000)
})
