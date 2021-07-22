import {
  render,
  screen,
  waitForElementToBeRemoved,
  within
} from "../../../test-utils"
import userEvent from "@testing-library/user-event"
import { Route } from "react-router-dom"
import Lists from "./lists"

describe("lists", () => {
  const renderComp = () =>
    render(
      <Route path="/lists" exact>
        <Lists />
      </Route>,
      { route: "/lists", authenticated: true }
    )

  test("gets list data", async () => {
    renderComp()

    expect(screen.getByText(/loading/i)).toBeInTheDocument()

    const lists = await screen.findAllByLabelText("list")
    expect(lists.length).toBe(5)
  })

  test("creates list", async () => {
    renderComp()

    const listForm = screen.getByLabelText(/list form/i)
    const nameInput = within(listForm).getByLabelText(/list name/i)
    const descInput = within(listForm).getByLabelText(/list description/i)
    const addButton = within(listForm).getByRole("button", { name: /add/i })

    expect(addButton).toHaveAttribute("disabled")

    userEvent.type(nameInput, "New List")
    expect(nameInput).toHaveValue("New List")

    userEvent.type(descInput, "a description of new list")
    expect(descInput).toHaveValue("a description of new list")

    expect(addButton).not.toHaveAttribute("disabled")
    userEvent.click(addButton)

    expect(await screen.findByText("New List")).toBeInTheDocument()
  })

  test("updates list", async () => {
    renderComp()

    const lists = await screen.findAllByLabelText("list")

    let updateButton = within(lists[0]).getByRole("button", {
      name: /update/i
    })
    userEvent.click(updateButton)

    const listForm = await screen.findByLabelText(/update list form/i)
    expect(listForm).toBeInTheDocument()

    const nameInput = within(listForm).getByLabelText(/list name/i)
    expect(nameInput).toHaveValue("Articles")

    const descInput = within(listForm).getByLabelText(/list description/i)
    expect(descInput).toHaveValue("A collection of cool articles")

    userEvent.type(nameInput, "{selectall}{del}Updated List Name")
    userEvent.type(descInput, "{selectall}{del}Updated list description")

    updateButton = within(listForm).getByRole("button", { name: /update/i })
    userEvent.click(updateButton)

    expect(await screen.findByText(/updated list name/i)).toBeInTheDocument()
    expect(
      await screen.findByText(/updated list description/i)
    ).toBeInTheDocument()
  })

  test("deletes list", async () => {
    renderComp()

    const lists = await screen.findAllByLabelText("list")
    expect(lists.length).toBe(5)
    expect(lists[0]).toHaveTextContent("Articles")

    const deleteButton = within(lists[0]).getByRole("button", {
      name: /delete/i
    })

    userEvent.click(deleteButton)
    await waitForElementToBeRemoved(() => screen.getByText("Articles"))
  })
})
