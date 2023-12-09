import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'

const prisma = new PrismaClient()

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body

  // TODO: use express-validator
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return res.status(400).json({ message: "L'utilisateur existe déjà" })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  })

  res.json({ message: 'Inscription réussie', user: newUser })
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  // TODO: use express-validator
  // Find the user by email
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    return res.status(401).json({ message: 'Utilisateur ou mot de passe incorrect.' })
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    return res.status(401).json({ message: 'Utilisateur ou mot de passe incorrect.' })
  }

  // Générer un token JWT (pour l'authentification)
  const token = jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET as Secret, {
    expiresIn: process.env.JWT_ACCESS_EXPIRATION as string,
  })

  res.json({ message: 'Connexion réussie', user, token })
}

export const me = async (req: Request, res: Response) => {
  res.json(
    await prisma.user.findUnique({
      where: {
        id: req.payload?.userId,
      },
    }),
  )
}
