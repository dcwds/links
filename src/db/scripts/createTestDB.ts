import { Client as FaunaClient } from "faunadb"
import { promisify } from "util"
import { exec } from "child_process"
import faunadb from "faunadb"

type CommandResponse = {
  msg: string
  type: "error" | "success"
  payload?: string | FaunaClient
}

const promisifiedExec = promisify(exec)

const cmdCreateDB = async (dbName: string): Promise<CommandResponse> => {
  const { stderr } = await promisifiedExec(
    `fauna create-database ${dbName} --endpoint=links-app-test`
  )

  return stderr
    ? { msg: `cannot create ${dbName}`, type: "error" }
    : { msg: `${dbName} has been created`, type: "success" }
}

const cmdCreateSecret = async (
  dbName: string,
  createResponse: CommandResponse
): Promise<CommandResponse> => {
  if (createResponse.type === "error") return createResponse

  const { stdout, stderr } = await promisifiedExec(
    `fauna create-key ${dbName} --endpoint=links-app-test`
  )

  if (!stderr) {
    const matches = stdout.match(/secret:\s(.+)\n/i)

    // grab the secret instead of the full match
    const secret = matches ? matches[1] : null

    return !secret
      ? { msg: "cannot parse secret", type: "error" }
      : {
          msg: "secret has been created",
          type: "success",
          payload: secret
        }
  } else return { msg: "cannot create secret", type: "error" }
}

const cmdUploadDBProps = async (
  secretResponse: CommandResponse
): Promise<CommandResponse> => {
  if (!secretResponse.payload) return secretResponse

  const { stderr } = await promisifiedExec(
    `
      NODE_NO_WARNINGS=1 \\
      TEST_SECRET=${secretResponse.payload} \\
      TEST_API_ENDPOINT=http://localhost:8453 \\
      TEST_GQL_ENDPOINT=http://localhost:8094 \\
      fgu \\
      --secretEnv TEST_SECRET \\
      --apiEndpointEnv TEST_API_ENDPOINT \\
      --graphqlEndpointEnv TEST_GQL_ENDPOINT \\
      --schemaPath ./src/db/schema.gql \\
      --fnsDir ./src/db/functions \\
      --indexesDir ./src/db/indexes
    `
  )

  return stderr
    ? { msg: stderr, type: "error" }
    : { msg: "uploaded db props", type: "success" }
}

const getFaunaClient = (
  secretResponse: CommandResponse,
  uploadResponse: CommandResponse
) => {
  if (secretResponse.type === "error") return secretResponse
  if (uploadResponse.type === "error") return uploadResponse

  const client = new faunadb.Client({
    secret: secretResponse.payload as string,
    domain: "localhost",
    port: 8453,
    scheme: "http"
  })

  return { msg: "created fauna client", type: "success", payload: client }
}

const createTestDB = async (dbName: string) => {
  const createResponse = await cmdCreateDB(dbName)
  const secretResponse = await cmdCreateSecret(dbName, createResponse)
  const uploadResponse = await cmdUploadDBProps(secretResponse)

  return getFaunaClient(secretResponse, uploadResponse)
}

export default createTestDB
