import express, { Express } from 'express'
import mongoose, { ConnectOptions } from 'mongoose'
import cors from 'cors'
import todoRouters from './routes'
import config from './config'

const app: Express = express()

const PORT: string = config.port ?? '4000'

app.use(cors())
app.use(express.json())
app.use(todoRouters)
/* eslint-disable  */
const uri: string = `mongodb+srv://${config.mongo_db_user}:${config.mongo_db_password}@${config.mongo_db_cluster}.g02kcxd.mongodb.net/`
const options = { useNewUrlParser: true, useUnifiedTopology: true }
/* eslint-disable  */
mongoose
  .connect(uri, options as ConnectOptions)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(err => {
    console.log(err)
    throw err
  })

  