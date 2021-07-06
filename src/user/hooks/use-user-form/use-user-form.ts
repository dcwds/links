import { useState, ChangeEvent, SyntheticEvent } from "react"
import { useHistory } from "react-router-dom"
import { useIdentityContext } from "react-netlify-identity"

type FieldState = {
  value: string
  error: string
}

const useUserForm = () => {
  const history = useHistory()
  const { loginUser, signupUser, updateUser, requestPasswordRecovery } =
    useIdentityContext()

  const [email, setEmail] = useState<FieldState>({ value: "", error: "" })
  const [password, setPassword] = useState<FieldState>({
    value: "",
    error: ""
  })
  const [error, setError] = useState<string>("")

  const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    // declaring `value` as variable is necessary
    // see: https://github.com/testing-library/user-event/issues/387#issuecomment-819761470
    const value = e.target.value
    setEmail((s) => ({ ...s, value }))
  }
  const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword((s) => ({ ...s, value }))
  }

  const signIn = async (e: SyntheticEvent<HTMLButtonElement>) => {
    if (!email.value)
      setEmail((s) => ({ ...s, error: "Please provide an email." }))
    if (!password.value)
      setPassword((s) => ({ ...s, error: "Please provide a password." }))
    if (!email.value || !password.value) return

    try {
      await loginUser(email.value, password.value, true)
      history.push("/")
    } catch (e) {
      console.log(e)
      setError("Wrong user credentials, try again.")
    }
  }
  const signUp = async (e: SyntheticEvent<HTMLButtonElement>) => {
    if (!email.value)
      setEmail((s) => ({ ...s, error: "Please provide an email." }))
    if (!password.value)
      setPassword((s) => ({ ...s, error: "Please provide a password." }))
    if (!email.value || !password.value) return

    try {
      await signupUser(email.value, password.value, {}, true)
      history.push("/")
    } catch (e) {
      console.log(e)
      setError("Something went wrong when trying to sign you up.")
    }
  }

  const recoverPassword = async (e: SyntheticEvent<HTMLButtonElement>) => {
    if (!email.value)
      return setEmail((s) => ({ ...s, error: "Please provide an email." }))

    requestPasswordRecovery(email.value)
    history.push("/recovery-success")
  }

  const resetPassword = async (e: SyntheticEvent<HTMLButtonElement>) => {
    if (!password.value)
      return setPassword((s) => ({
        ...s,
        error: "Please provide a new password."
      }))

    try {
      await updateUser({ password: password.value })
      history.push("/")
    } catch (e) {
      console.log(e)
      setError("Something went wrong.")
    }
  }

  return {
    email,
    password,
    error,
    changeEmail,
    changePassword,
    signIn,
    signUp,
    recoverPassword,
    resetPassword
  }
}

export default useUserForm
