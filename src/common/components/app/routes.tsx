import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { useIdentityContext } from "react-netlify-identity"
import Login from "../../../user/components/login"
import SignUp from "../../../user/components/sign-up"

const Routes = () => {
  const { isLoggedIn } = useIdentityContext()

  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <Route path="/" exact>
            <p>You are logged in.</p>
          </Route>
        ) : (
          <>
            <Route path="/" exact>
              <p>Please log in.</p>
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Login</Link>
            </Route>
            <Route path="/signup" exact component={SignUp} />
            <Route path="/login" exact component={Login} />
          </>
        )}
      </Switch>
    </Router>
  )
}

export default Routes
