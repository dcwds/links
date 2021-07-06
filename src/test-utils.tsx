import { NETLIFY_URL } from "./constants"
import { useEffect, useRef, ReactElement, FC } from "react"
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
  const { isLoggedIn, loginUser, logoutUser } = useIdentityContext()
  const isCancelled = useRef(false)

  useEffect(() => {
    if (!isLoggedIn && authenticated && !isCancelled.current)
      loginUser("user@domain.com", "", false)

    return () => {
      if (isLoggedIn) logoutUser()

      isCancelled.current = true
    }
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
