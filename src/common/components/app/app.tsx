import { NETLIFY_URL } from "../../../constants"
import { IdentityContextProvider } from "react-netlify-identity"
import Routes from "./routes"

const App = () => (
  <IdentityContextProvider url={NETLIFY_URL}>
    <div>
      <header>Links</header>
    </div>
    <Routes />
  </IdentityContextProvider>
)

export default App
