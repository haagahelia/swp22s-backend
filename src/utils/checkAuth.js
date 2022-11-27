
import jwt from 'jsonwebtoken'


export default function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization
    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1]

      const decodedUser = jwt.verify(token, process.env.JWT_SECRET)

      req.user = decodedUser
      return next()
    }
    throw new ForbiddenError()
  } catch (error) {
    throw new ForbiddenError()
  }
}
