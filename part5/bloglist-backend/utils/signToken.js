const jwt = require('jsonwebtoken')

const signToken = (user) => {
  const userForToken = {
    username: user.username,
    id: user._id,
  }
  const signed = jwt.sign(
    userForToken,
    process.env.SECRET,
    { expiresIn: 60 * 60 }
  )
  return signed
}

module.exports = { signToken }