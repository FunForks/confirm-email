// FUNCTIONS FOR JWT tokens // FUNCTIONS FOR JWT tokens //
const jwt = require('jsonwebtoken')


const createToken = (request, response, next) => {
  const { body } = request
  const { email } = body
  const payload = { email }

  const options = {
    expiresIn: `${24*60*60}s` // 24 hours
  }

  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    options
  )

  body.token = token
  next()
}


function verifyToken(request, response) {
  const { token } = request.params

  if (!token) {
    return response.status(401).send("No authorization")
  }

  const callback = (error, result) => {
    if (error) {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses
      const { message } = error
      switch (message) {
        case "jwt expired":
          response.status(403) // Forbidden
        break
        // FALL THROUGH BELOW
        case "invalid signature":
        case "jwt malformed":
          response.status(401) // Unauthorized
        break
        default:
          response.status(406) // Not acceptable
      }

      return response.json({ error })
    }

    // No error. Proceed.
    response
      .status(200)
      .send(`Confirmation received from ${result.email}`)
  }

  jwt.verify(token, process.env.JWT_SECRET, callback)
}


module.exports = {
  createToken,
  verifyToken
}