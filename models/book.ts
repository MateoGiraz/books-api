export interface Book { 
  id: string
  title: string
  author: string
  publicationDate: Date
}

export const createBook = (id: string, title: string, author: string, publicationDate = new Date()): Book => {
  return {
    id,
    title,
    author,
    publicationDate
  }
}