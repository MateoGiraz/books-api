import express from 'express'
import { booksRouter } from './routes/books'

const app = express()

app.use('/books', booksRouter)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))