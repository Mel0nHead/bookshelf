import {server, rest} from 'test/server'
import {client} from '../api-client'

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

it('calls fetch at the endpoint with the arguments for GET requests', async () => {
  const endpoint = 'test-endpoint'
  const mockResult = {mockValue: 'VALUE'}

  server.use(
    rest.get(
      `${process.env.REACT_APP_API_URL}/${endpoint}`,
      async (_, res, ctx) => {
        return res(ctx.json(mockResult))
      },
    ),
  )

  const result = await client(endpoint)
  expect(result).toStrictEqual(mockResult)
})

it('adds auth token when a token is provided', async () => {
  const fakeToken = 'abc123'
  let request
  const endpoint = 'test-endpoint'

  server.use(
    rest.get(
      `${process.env.REACT_APP_API_URL}/${endpoint}`,
      async (req, res, ctx) => {
        request = req
        return res(ctx.json({mockValue: 'VALUE'}))
      },
    ),
  )

  await client(endpoint, {token: fakeToken})
  expect(request.headers.get('Authorization')).toContain(fakeToken)
})

it('allows for config overrides', async () => {
  let request
  const endpoint = 'test-endpoint'
  const config = {
    mode: 'cors',
    headers: {
      memes: 'dreams',
    },
  }

  server.use(
    rest.get(
      `${process.env.REACT_APP_API_URL}/${endpoint}`,
      async (req, res, ctx) => {
        request = req
        return res(ctx.json({mockValue: 'VALUE'}))
      },
    ),
  )

  await client(endpoint, config)
  expect(request.headers.get('memes')).toBe('dreams')
  expect(request.mode).toBe('cors')
})

it('when data is provided, it is stringified and the method defaults to POST', async () => {
  let request
  const endpoint = 'test-endpoint'
  const data = {
    uWot: 'm8',
  }

  server.use(
    rest.post(
      `${process.env.REACT_APP_API_URL}/${endpoint}`,
      async (req, res, ctx) => {
        request = req
        return res(ctx.json({mockValue: 'VALUE'}))
      },
    ),
  )

  await client(endpoint, {data})
  expect(request.body).toEqual(data)
})
