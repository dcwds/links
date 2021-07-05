import { useEffect } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { useIdentityContext } from "react-netlify-identity"
import SignIn from "../../../user/components/sign-in"
import SignOut from "../../../user/components/sign-out"
import SignUp from "../../../user/components/sign-up"

const Routes = () => {
  const {
    isLoggedIn,
    param: { token, type },
    recoverAccount,
    user
  } = useIdentityContext()

  useEffect(() => {
    // quick and dirty solution for account recovery
    // later there needs to be a reset password flow
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
    <Router>
      <Switch>
        {isLoggedIn ? (
          <>
            <Route path="/" exact>
              <p>You are signed in as {user?.email}.</p>
              <Link to="/sign-out">Sign Out</Link>
            </Route>
            <Route path="/sign-out" exact component={SignOut} />
          </>
        ) : (
          <>
            <Route path="/" exact>
              <p>Please sign in.</p>
              <Link to="/sign-up">Sign Up</Link>
              <Link to="/sign-in">Sign In</Link>
            </Route>
            <Route path="/sign-up" exact component={SignUp} />
            <Route path="/sign-in" exact component={SignIn} />
          </>
        )}
      </Switch>
    </Router>
  )
}

export default Routes
