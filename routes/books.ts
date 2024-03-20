import express from "express"

export const booksRouter = express.Router()

booksRouter.get('/', (req, res) => {
  res.send('All books')
})
