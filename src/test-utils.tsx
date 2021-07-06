import { NETLIFY_URL } from "./constants"
import { useEffect, ReactElement, FC } from "react"
import { MemoryRouter } from "react-router-dom"
import {
  IdentityContextProvider,
  useIdentityContext
} from "react-netlify-identity"
import { render } from "@testing-library/react"

type UIWrapperProps = {
  route?: string
  authenticated?: boolean
}

const UIWrapper: FC<{ children: ReactElement } & UIWrapperProps> = ({
  children,
  route,
  authenticated
}) => {
  const { isLoggedIn, loginUser } = useIdentityContext()

  useEffect(() => {
    if (!isLoggedIn && authenticated) loginUser("user@domain.com", "", true)
  })

  return <MemoryRouter initialEntries={[route || "/"]}>{children}</MemoryRouter>
}

const renderInContext = (ui: ReactElement, wrapperProps?: UIWrapperProps) => {
  return {
    ...render(
      <IdentityContextProvider url={NETLIFY_URL}>
        <UIWrapper {...wrapperProps}>{ui}</UIWrapper>
      </IdentityContextProvider>
    )
  }
}

export * from "@testing-library/react"
export { renderInContext as render }
