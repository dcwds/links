import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useIdentityContext } from "react-netlify-identity"
import useUserForm from "../../hooks/use-user-form"

const Recovery = () => {
  const { token } = useParams<{ token: string }>()
  const { recoverAccount } = useIdentityContext()
  const f = useUserForm()

  const [tokenError, setTokenError] = useState<string>("")

  useEffect(() => {
    if (token) {
      ;(async () => {
        try {
          await recoverAccount(true)
          console.log("Account recovered.")
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
          {!tokenError && (
            <>
              <h2>Reset your password</h2>
              {f.error && f.error}
              <input
                onChange={f.changePassword}
                value={f.password}
                type="password"
                name="password"
              />
              <button onClick={f.resetPassword}>Reset Password</button>
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
