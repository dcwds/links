import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useIdentityContext } from "react-netlify-identity"

const SignOut = () => {
  const history = useHistory()
  const { logoutUser } = useIdentityContext()

  useEffect(() => {
    logoutUser()

    setTimeout(() => history.push("/"), 200)
  }, [history, logoutUser])

  return <div>Signing you out and redirecting...</div>
}

export default SignOut
