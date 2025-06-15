import express from 'express'
import teamRoutes from '../src/routes/teams.js'
import playerRoutes from '../src/routes/players.js'
import { serve, setup } from '../src/swagger.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/api', teamRoutes)
app.use('/api', playerRoutes)

// Swagger docs.
app.use('/', serve, setup)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  console.log(`API Documentation available at http://localhost:${PORT}`)
})
