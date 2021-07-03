import { Link } from "react-router-dom"
import useUserForm from "../../hooks/use-user-form"

const SignIn = () => {
  const f = useUserForm()

  return (
    <div>
      {f.error && <p>${f.error}</p>}
      <input
        onChange={f.changeEmail}
        value={f.email}
        type="email"
        name="email"
      />
      <input
        onChange={f.changePassword}
        value={f.password}
        type="password"
        name="password"
      />
      <button onClick={f.signIn}>Sign In</button>
      <Link to="/recovery">Recover your password</Link>
    </div>
  )
}

export default SignIn
