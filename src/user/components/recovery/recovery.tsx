import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useIdentityContext, User } from "react-netlify-identity"
import useUserForm from "../../hooks/use-user-form"

const Recovery = () => {
  const { token } = useParams<{ token: string }>()
  const { verifyToken } = useIdentityContext()
  const f = useUserForm()

  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    if (!token) return
    ;(async () => {
      try {
        console.log(token)
        const user = await verifyToken()

        console.log(user)
        if (typeof user === "object") return setUser(user)
      } catch (e) {
        console.log(e)
        setError("Could not verify the provided recovery token.")
      }
    })()
  }, [token, verifyToken])

  // log to avoid eslint errors while testing in prod
  console.log(user)
  console.log(error)

  return (
    <div>
      {token ? (
        <p>has token</p>
      ) : (
        <div>
          {f.error && f.error}
          <input
            onChange={f.changeEmail}
            value={f.email}
            type="email"
            name="email"
          />
          <button onClick={f.recoverPassword}>Recover Password</button>
        </div>
      )}
    </div>
  )
}

export default Recovery
