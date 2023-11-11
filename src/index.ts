import express, { Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req: Request, res: Response): void => {
  res.send('Hello World!')
})

app.listen(port, (): void => {
  console.log(`Server running at http://localhost:${port}`)
})
