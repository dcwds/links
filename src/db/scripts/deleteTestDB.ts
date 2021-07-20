import { promisify } from "util"
import { exec } from "child_process"

const promisifiedExec = promisify(exec)

const deleteTestDB = async (dbName: string) => {
  const { stderr } = await promisifiedExec(
    `fauna delete-database ${dbName} --endpoint=links-app-test`
  )

  return stderr
    ? { msg: `could not delete ${dbName}`, type: "error" }
    : { msg: `${dbName} has been deleted`, type: "success" }
}

export default deleteTestDB
