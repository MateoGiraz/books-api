import { IBooksRepository } from '../repository/IBooksRepository'
import { BooksRepository } from '../repository/BooksRepository'
import { createBook } from '../models/book'
import { ERROR_MESSAGES } from '../messages'

describe('BooksRepository', () => {
  let booksRepository: IBooksRepository

  const firstBook = createBook('1', 'Book 1', 'Author 1')
  const secondBook = createBook('2', 'Book 2', 'Author 2')

  beforeEach(() => {
    booksRepository = new BooksRepository()
  })

  afterEach(() => {
    booksRepository.getBooks().forEach(book => booksRepository.deleteBook(book.id))
  })

  describe('getBooks', () => {
    it('should return an empty array when no books are added', () => {
      const books = booksRepository.getBooks()
      expect(books).toEqual([])
    })

    it('should return all added books', () => {
      booksRepository.addBook(firstBook)
      booksRepository.addBook(secondBook)
      
      const books = booksRepository.getBooks()
      expect(books).toEqual([firstBook, secondBook])
    })
  })

  describe('getBookById', () => {
    it('should throw an error when no book with the given id exists', () => {
      expect(() => {
        booksRepository.getBookById('non-existing book id')
      }).toThrow(ERROR_MESSAGES.bookNotFound)
    })

    it('should return the correct book when it exists', () => {
      booksRepository.addBook(firstBook)
      const foundBook = booksRepository.getBookById(firstBook.id)
      expect(foundBook).toEqual(firstBook)
    })
  })

  describe('addBook', () => {
    it('should throw an error when trying to add a book with an existing id', () => {
      booksRepository.addBook(firstBook)

      expect(() => {
        booksRepository.addBook(firstBook)
      }).toThrow(ERROR_MESSAGES.bookAlreadyExists)
    })

    it('should add a book to the repository', () => {
      booksRepository.addBook(firstBook)
      const books = booksRepository.getBooks()
      expect(books).toEqual([firstBook])
    })
  })

  describe('updateBook', () => {
    it('should throw an error when trying to update a non-existing book', () => {
      expect(() => {
        const nonExistingBook = createBook('non-existing-id', 'Non-existing Book', 'Non-existing Author')
        booksRepository.updateBook('1', nonExistingBook)
      }).toThrow(ERROR_MESSAGES.bookNotFound)
    })

    it('should update the book when it exists', () => {
      booksRepository.addBook(firstBook)

      const updatedBook = createBook(firstBook.id, 'Updated Book', 'Updated Author')
      booksRepository.updateBook(firstBook.id, updatedBook)

      const books = booksRepository.getBooks()
      expect(books).toContainEqual(updatedBook)
      expect(books).not.toContainEqual(firstBook)
    })
  })

  describe('deleteBook', () => {
    it('should throw an error when trying to delete a non-existing book', () => {
      expect(() => {
        booksRepository.deleteBook('non-existing-id')
      }).toThrow(ERROR_MESSAGES.bookNotFound)
    })

    it('should delete the book when it exists', () => {
      booksRepository.addBook(firstBook)
      booksRepository.addBook(secondBook)
      
      booksRepository.deleteBook(firstBook.id)
      
      const books = booksRepository.getBooks()
      expect(books).toEqual([secondBook])
    })
  })
})
