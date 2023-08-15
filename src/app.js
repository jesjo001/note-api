import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import connect from './db/connect'
import Routes from "./routes/Routes"
import deserializeUser from './middlewares/deserializeUser'
config()

const app = express()
const dev = process.env.NODE_ENV !== 'production';

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3021', 'http://localhost:3040'];
var corsOptions = {
  origin: function (origin, callback) {
    if(!origin && dev){//for bypassing postman req with  no origin
      return callback(null, true);
    }
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
};


//middlewares
app.use(deserializeUser);

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())

//Routes
app.use('/api/v1', Routes)
app.get('/', (req, res) => res.status(200).send('Welcome to the Note taking API!'))
app.get('*', (req, res) => res.status(404).send('NOT FOUND'))

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://${process.env.HOST}:${process.env.PORT}/api/v1`)
    //TODO: connect to db
    connect()
})

