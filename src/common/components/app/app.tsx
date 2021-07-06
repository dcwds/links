import { NETLIFY_URL } from "../../../constants"
import { IdentityContextProvider } from "react-netlify-identity"
import { BrowserRouter as Router } from "react-router-dom"
import Routes from "../routes"

const App = () => (
  <IdentityContextProvider url={NETLIFY_URL}>
    <div>
      <header>Links</header>
    </div>
    <Router>
      <Routes />
    </Router>
  </IdentityContextProvider>
)

export default App
