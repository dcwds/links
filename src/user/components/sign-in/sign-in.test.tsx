import { render, screen } from "../../../test-utils"
import { Route } from "react-router-dom"
import userEvent from "@testing-library/user-event"
import SignIn from "./sign-in"

test("successfully sign in with valid email and password", async () => {
  render(
    <>
      <Route path="/" exact>
        <p>Signed in.</p>
      </Route>
      <Route path="/sign-in">
        <SignIn />
      </Route>
    </>,
    { route: "/sign-in" }
  )

  const email = screen.getByLabelText(/signin-email/i)
  const password = screen.getByLabelText(/signin-password/i)
  const signInBtn = screen.getByLabelText(/signin-button/i)

  expect(email).toHaveValue("")
  userEvent.click(email)
  userEvent.type(email, "user@somedomain.com")
  expect(email).toHaveValue("user@somedomain.com")

  expect(password).toHaveValue("")
  userEvent.click(password)
  userEvent.type(password, "abc12345")
  expect(password).toHaveValue("abc12345")

  userEvent.click(signInBtn)

  expect(await screen.findByText("Signed in.")).toBeInTheDocument()
})
