import { render, screen } from "../../../test-utils"
import Routes from "./routes"

describe("Routes", () => {
  test("shows sign in when not authenticated as a user", () => {
    render(<Routes />)

    expect(screen.getByRole("link", { name: /sign in/i })).toBeInTheDocument()
  })

  test("shows sign out when authenticated as a user", async () => {
    render(<Routes />, { authenticated: true })

    expect(
      await screen.findByRole("link", { name: /sign out/i })
    ).toBeInTheDocument()
  })
})
