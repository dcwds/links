import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useIdentityContext } from "react-netlify-identity"

const Logout = () => {
  const history = useHistory()
  const { logoutUser } = useIdentityContext()

  useEffect(() => {
    logoutUser()

    setTimeout(() => history.push("/"), 200)
  }, [history, logoutUser])

  return <div>Logging you out and redirecting...</div>
}

export default Logout
