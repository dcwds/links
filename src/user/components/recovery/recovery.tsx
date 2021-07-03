import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useIdentityContext, User } from "react-netlify-identity"
import useUserForm from "../../hooks/use-user-form"

const Recovery = () => {
  const { token } = useParams<{ token: string }>()
  const { verifyToken } = useIdentityContext()
  const f = useUserForm()

  const [fetchedUser, setFetchedUser] = useState<User | null>(null)
  const [tokenError, setTokenError] = useState<string>("")

  useEffect(() => {
    if (token && !fetchedUser && !tokenError) {
      ;(async () => {
        try {
          const user = await verifyToken()
          console.log("verifyToken called")
          console.log(user)

          if (typeof user === "object") setFetchedUser(user)
        } catch (e) {
          console.log(e)
          setTokenError("Could not verify the provided recovery token.")
        }
      })()
    }
  })

  return (
    <div>
      {token ? (
        <>
          {tokenError && <p>{tokenError}</p>}
          {fetchedUser && (
            <>
              <h2>Reset your password</h2>
              <input
                onChange={f.changePassword}
                value={f.password}
                type="password"
                name="password"
              />
              <button>Reset Password</button>
            </>
          )}
        </>
      ) : (
        <>
          <h2>Recover your password</h2>
          {f.error && f.error}
          <input
            onChange={f.changeEmail}
            value={f.email}
            type="email"
            name="email"
          />
          <button onClick={f.recoverPassword}>Recover Password</button>
        </>
      )}
    </div>
  )
}

export default Recovery
