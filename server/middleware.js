const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ error: 'Токен не предоставлен' })
  }

  jwt.verify(token, 'secret', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Недействительный токен' })
    }
    req.user = user
    next()
  })
}

module.exports = authMiddleware
