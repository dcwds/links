import useAuthUser from "../../hooks/use-auth-user"

const SignUp = () => {
  const { email, password, error, changeEmail, changePassword, submit } =
    useAuthUser("signup")

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
      <button onClick={submit}>Sign Up</button>
    </div>
  )
}

export default SignUp
