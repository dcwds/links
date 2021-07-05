import { NETLIFY_URL } from "./constants"
import { ReactElement } from "react"
import { MemoryRouter, Route } from "react-router-dom"
import { IdentityContextProvider } from "react-netlify-identity"
import { render } from "@testing-library/react"

const renderInContext = (ui: ReactElement, { route = "/" } = {}) => {
  // access history as described in the docs
  // https://reactrouter.com/web/guides/testing/checking-location-in-tests
  let history = null

  return {
    ...render(
      <IdentityContextProvider url={NETLIFY_URL}>
        <MemoryRouter initialEntries={[route]}>
          {ui}
          <Route
            path="*"
            render={(props) => {
              history = props.history
              return null
            }}
          />
        </MemoryRouter>
      </IdentityContextProvider>
    ),
    history
  }
}

export * from "@testing-library/react"
export { renderInContext as render }
