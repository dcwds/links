import { useEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { useIdentityContext } from "react-netlify-identity"

const RecoveryCapture = () => {
  const {
    param: { token, type }
  } = useIdentityContext()
  const { replace } = useHistory()
  const { pathname } = useLocation()

  console.log(token)

  useEffect(() => {
    if (token && type === "recovery" && pathname === "/")
      replace(`/recovery/${token}`)
  }, [token, type, pathname, replace])

  return null
}

export default RecoveryCapture
