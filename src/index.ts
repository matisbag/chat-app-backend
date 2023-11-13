import express, { Request, Response } from 'express'
import authRoutes from './routes/authRoutes'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response): void => {
  res.send('Hello World!')
})

app.use('/auth', authRoutes)

app.listen(port, (): void => {
  console.log(`Server running at http://localhost:${port}`)
})
