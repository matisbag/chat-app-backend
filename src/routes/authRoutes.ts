import express from 'express'
import { auth } from '../middlewares/authMiddleware'
import { signup, login, me } from '../controllers/authController'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/me', auth, me)

export default router
