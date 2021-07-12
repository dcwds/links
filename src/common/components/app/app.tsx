import { NETLIFY_URL } from "../../../constants"
import { IdentityContextProvider } from "react-netlify-identity"

import { ThemeProvider } from "styled-components"
import GlobalStyle from "../global-style"
import theme from "../../styles/theme"
import styled from "styled-components"

import { BrowserRouter as Router, Link } from "react-router-dom"
import Routes from "../routes"

const StyledContainer = styled.div`
  display: flex;
  max-width: 48em;
  margin: 0 auto;
  flex-direction: column;
`

const StyledHeader = styled.header`
  padding: 2em 0;
`

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <IdentityContextProvider url={NETLIFY_URL}>
      <StyledContainer>
        <Router>
          <StyledHeader>
            <Link to="/">Links App</Link>
          </StyledHeader>
          <Routes />
        </Router>
      </StyledContainer>
    </IdentityContextProvider>
  </ThemeProvider>
)

export default App
