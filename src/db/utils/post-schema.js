require("dotenv/config")
const fetch = require("node-fetch")
const fs = require("fs")
const path = require("path")

// Be sure the fauna docker instance is started (yarn dev:db:start) and that
// you have created an endpoint in fauna cli before running this script.

const postDatabaseSchema = async () => {
  // This needs to be configured through fauna cli.
  // See README for more information.
  const endpoint = "http://localhost:8084/import"

  if (!process.env.FAUNA_LOCAL_DB_SECRET) {
    console.log(
      `
        You need to configure a FAUNA_LOCAL_DB_SECRET environment variable.
        It should be placed within .env at the project's root directory.
        See the project README for more information.
     `.replace(/  +/g, "")
    )
    return
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FAUNA_LOCAL_DB_SECRET}`,
        "Content-Type": "text/plain"
      },
      body: fs.createReadStream(path.join(process.cwd(), "./src/db/schema.gql"))
    })

    console.log(await response.text())
  } catch (e) {
    console.log(e)
  }
}

postDatabaseSchema()

module.exports = { postDatabaseSchema }
