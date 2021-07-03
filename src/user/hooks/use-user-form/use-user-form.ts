import { useState, ChangeEvent, SyntheticEvent } from "react"
import { useHistory } from "react-router-dom"
import { useIdentityContext } from "react-netlify-identity"

const useUserForm = () => {
  const history = useHistory()
  const { loginUser, signupUser, requestPasswordRecovery } =
    useIdentityContext()

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")

  const changeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value)
  const changePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value)

  const signIn = async (e: SyntheticEvent<HTMLButtonElement>) => {
    if (!email || !password)
      return setError("Please provide both an email and password.")

    try {
      const user = await loginUser(email, password, true)

      history.push("/")
      console.log(user)
    } catch (e) {
      console.log(e)
    }
  }
  const signUp = async (e: SyntheticEvent<HTMLButtonElement>) => {
    if (!email || !password)
      return setError("Please provide both an email and password.")

    try {
      const user = await signupUser(email, password, {}, true)

      history.push("/")
      console.log(user)
    } catch (e) {
      console.log(e)
    }
  }

  const recoverPassword = async (e: SyntheticEvent<HTMLButtonElement>) => {
    if (!email) return setError("Please provide your email.")

    requestPasswordRecovery(email)
    history.push("/recovery-success")
  }

  return {
    email,
    password,
    error,
    changeEmail,
    changePassword,
    signIn,
    signUp,
    recoverPassword
  }
}

export default useUserForm
