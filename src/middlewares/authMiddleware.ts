import { Request, Response, NextFunction } from 'express'
import jwt, { Secret, JwtPayload } from 'jsonwebtoken'

export const auth = (req: Request, res: Response, next: NextFunction) => {
  // Retrieve the token from the request headers
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({ message: 'Error. Token required' })
  }

  // Verify the JWT token
  jwt.verify(token, process.env.JWT_ACCESS_SECRET as Secret, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: 'Error. Invalid token' })
    }

    // Attach decoded token to request object
    req.payload = decoded as JwtPayload

    return next()
  })
}
