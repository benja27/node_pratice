import express from 'express'
import {dirname, join } from 'path'
import {fileURLToPath} from 'url'
import indexRouter from './routes/index.js'


const app = express()
app.use(indexRouter)

const __dirname = dirname(fileURLToPath(import.meta.url))
console.log(__dirname)

app.set('view engine', 'ejs' )
app.set('views', join(__dirname, 'views' ) )


app.listen(3000)
console.log('hello world')

