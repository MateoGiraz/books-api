import { Book } from "../models/book"

export interface IBooksRepository {
  getBooks(): Book[]
  getBookById(id: string): Book
  addBook(book: Book): void
  updateBook(id: string, book: Book): void
  deleteBook(id: string): void
}
