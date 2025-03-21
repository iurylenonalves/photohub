import cors from'cors'
import express from 'express'
import dotenv from 'dotenv'
import { router } from './router'
import { errorHandlerMiddleware } from './server/middlewares/error-handler'


dotenv.config()

const app = express()

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json())
app.use("/api", router)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })
