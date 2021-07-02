import { IdentityContextProvider } from "react-netlify-identity"
import Routes from "./routes"

const App = () => {
  const url = "https://dcwds-links.netlify.app"

  return (
    <IdentityContextProvider url={url}>
      <div>
        <header>Links</header>
      </div>
      <Routes />
    </IdentityContextProvider>
  )
}

export default App
