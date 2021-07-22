import { NETLIFY_URL } from "./constants"
import { rest, RestRequest } from "msw"

// user
import tokenMock from "./user/mocks/token.json"
import settingsMock from "./user/mocks/identity-settings.json"
import userMock from "./user/mocks/user.json"

// lists
import { List, ListNew } from "./lists/types"
import getListsMock from "./lists/mocks/get-lists-res.json"

const handlers = [
  rest.post(`${NETLIFY_URL}/.netlify/identity/logout`, (_, res, ctx) =>
    res(ctx.json({}))
  ),
  rest.post(`${NETLIFY_URL}/.netlify/identity/token`, (_, res, ctx) =>
    res(ctx.json(tokenMock))
  ),
  rest.get(`${NETLIFY_URL}/.netlify/identity/user`, (_, res, ctx) =>
    res(ctx.json(userMock))
  ),
  rest.get(`${NETLIFY_URL}/.netlify/identity/settings`, (_, res, ctx) =>
    res(ctx.json(settingsMock))
  ),
  rest.get(`${NETLIFY_URL}/.netlify/identity`, (_, res, ctx) =>
    res(ctx.json(userMock))
  ),
  rest.get("/api/get-lists", (_, res, ctx) =>
    res(ctx.json({ data: getListsMock }))
  ),
  rest.post("/api/create-list", (req, res, ctx) => {
    const { body } = req as RestRequest<ListNew, any>

    // if this is invoked more than once in a test, there's a possibility
    // of exceptions being thrown because of the hard-coded id
    return res(
      ctx.json({
        data: { ...body, createdAt: 1626879535689, id: "914734665221535431" }
      })
    )
  }),
  rest.post("/api/update-list", (req, res, ctx) => {
    const { body } = req as RestRequest<List, any>
    return res(ctx.json({ data: body }))
  }),
  rest.post("/api/delete-list", (req, res, ctx) => {
    const { body } = req as RestRequest<List, any>
    return res(ctx.json({ id: body.id }))
  })
]

export default handlers
