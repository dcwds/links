import useUserForm from "../../hooks/use-user-form"

const SignUp = () => {
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
      <button onClick={f.signUp}>Sign Up</button>
    </div>
  )
}

export default SignUp
