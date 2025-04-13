import express from 'express'
import config from './config/config'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send('URL Shortener Server')
})

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`)
})
