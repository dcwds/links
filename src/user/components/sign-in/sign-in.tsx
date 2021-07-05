import { Link } from "react-router-dom"
import useUserForm from "../../hooks/use-user-form"

const SignIn = () => {
  const f = useUserForm()

  return (
    <div>
      <h2>Sign In</h2>
      {f.error && <p>${f.error}</p>}
      <div>
        <input
          onChange={f.changeEmail}
          value={f.email.value}
          type="email"
          name="email"
          placeholder="Email"
          aria-label="signin-email"
        />
        {f.email.error && <p>{f.email.error}</p>}
      </div>
      <div>
        <input
          onChange={f.changePassword}
          value={f.password.value}
          type="password"
          name="password"
          placeholder="Password"
          aria-label="signin-password"
        />
        {f.password.error && <p>{f.password.error}</p>}
      </div>
      <button onClick={f.signIn} aria-label="signin-button">
        Sign In
      </button>
      <Link to="/recovery">Recover your password</Link>
    </div>
  )
}

export default SignIn
