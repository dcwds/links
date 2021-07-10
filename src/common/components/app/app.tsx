import { NETLIFY_URL } from "../../../constants"
import { IdentityContextProvider } from "react-netlify-identity"
import { BrowserRouter as Router } from "react-router-dom"
import Routes from "../routes"
import GlobalStyle from "../global-style"

const App = () => (
  <>
    <GlobalStyle />
    <IdentityContextProvider url={NETLIFY_URL}>
      <div>
        <header>Links</header>
      </div>
      <Router>
        <Routes />
      </Router>
    </IdentityContextProvider>
  </>
)

export default App
