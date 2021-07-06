import { NETLIFY_URL } from "./constants"
import { rest } from "msw"

import tokenMock from "./user/mocks/token.json"
import settingsMock from "./user/mocks/identity-settings.json"
import userMock from "./user/mocks/user.json"

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
  )
]

export default handlers
