import useAuthUser from "../../hooks/use-auth-user"

const Login = () => {
  const { email, password, error, changeEmail, changePassword, submit } =
    useAuthUser("login")

  return (
    <div>
      {error && <p>${error}</p>}
      <input onChange={changeEmail} value={email} type="email" name="email" />
      <input
        onChange={changePassword}
        value={password}
        type="password"
        name="password"
      />
      <button onClick={submit}>Login</button>
    </div>
  )
}

export default Login
