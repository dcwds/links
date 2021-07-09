import { useEffect } from "react"
import { useIdentityContext } from "react-netlify-identity"
import { Switch, Route, Link } from "react-router-dom"
import SignIn from "../../../user/components/sign-in"
import SignOut from "../../../user/components/sign-out"
import SignUp from "../../../user/components/sign-up"
import Dashboard from "../../../user/components/dashboard"

const Routes = () => {
  const {
    isLoggedIn,
    param: { token, type },
    recoverAccount,
    user
  } = useIdentityContext()

  useEffect(() => {
    // quick and dirty solution for account recovery
    // todo: later there needs to be a reset password flow
    if (token && type === "recovery") {
      ;(async () => {
        try {
          await recoverAccount(true)
        } catch (e) {
          console.log(e)
        }
      })()
    }
  })

  return (
    <Switch>
      {isLoggedIn ? (
        <>
          <Route path="/" exact>
            <p>You are signed in as {user?.email}.</p>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/sign-out">Sign Out</Link>
          </Route>
          <Route path="/dashboard" component={Dashboard} exact />
          <Route path="/sign-out" component={SignOut} exact />
        </>
      ) : (
        <>
          <Route path="/" exact>
            <p>Please sign in.</p>
            <Link to="/sign-up">Sign Up</Link>
            <Link to="/sign-in">Sign In</Link>
          </Route>
          <Route path="/sign-up" component={SignUp} exact />
          <Route path="/sign-in" component={SignIn} exact />
        </>
      )}
    </Switch>
  )
}

export default Routes
