import { indexWasFound, areEqual } from "../helpers/helpers"
import { ERROR_MESSAGES } from "../messages"
import { Book } from "../models/book"
import { IBooksRepository } from "./IBooksRepository"

export class BooksRepository implements IBooksRepository {
  books: Book[] = []

  getBooks(): Book[] {
    return this.books
  }

  getBookById(id: string): Book {
    const index = this.getIndexAndThrowIfNotFound(id)
    return this.books[index]
  }

  addBook(book: Book): void {
    const index = this.getBookIndex(book.id)

    if (indexWasFound(index)) {
      throw new Error(ERROR_MESSAGES.bookAlreadyExists)
    }
    
    this.books.push(book)
  }

  updateBook(id: string, updateBook: Book): void {
    const index = this.getIndexAndThrowIfNotFound(id)
    this.books[index] = updateBook
  }

  deleteBook(id: string): void {
    const index = this.getIndexAndThrowIfNotFound(id)
    this.deleteBookWithIndex(index)
  }

  private getIndexAndThrowIfNotFound(id: string): number {
    const index = this.getBookIndex(id)

    if (!indexWasFound(index)) {
      throw new Error(ERROR_MESSAGES.bookNotFound)
    }

    return index
  }

  private getBookIndex(id: string): number {
    return this.books.findIndex(book => areEqual(book.id, id))
  }

  private deleteBookWithIndex(index: number): void {
    this.books.splice(index, 1)
  }
}
