const jwt = require('jsonwebtoken')

function sigIn(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET)
}

function verify(payload) {
  return jwt.verify(payload, process.env.JWT_SECRET)
}

module.exports = {
  sigIn, verify
} 
