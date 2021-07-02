import { useState, ChangeEvent, SyntheticEvent } from "react"
import { useHistory } from "react-router-dom"
import { useIdentityContext } from "react-netlify-identity"

const useAuthUser = (operation: string) => {
  const history = useHistory()
  const { loginUser, signupUser } = useIdentityContext()

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")

  const changeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value)
  const changePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value)
  const submit = async (e: SyntheticEvent<HTMLButtonElement>) => {
    if (!email || !password)
      return setError("Please provide both an email and password.")

    try {
      const user =
        operation === "signup"
          ? await signupUser(email, password, {}, true)
          : await loginUser(email, password, true)

      history.push("/")
      console.log(user)
    } catch (e) {
      //setError(e)

      console.log(e)
    }
  }

  return { email, password, error, changeEmail, changePassword, submit }
}

export default useAuthUser
