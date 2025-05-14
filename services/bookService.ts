import { Book } from '../models/bookModel';
import { v4 as uuidv4 } from 'uuid';

let books: Book[] = [];

export const getAllBooks = (): Book[] => books;

export const getBookById = (id: string): Book | undefined => books.find(book => book.id === id);

export const addBook = (data: Omit<Book, 'id'>): Book => {
  const newBook = { id: uuidv4(), ...data };
  books.push(newBook);
  return newBook;
};

export const updateBook = (id: string, data: Omit<Book, 'id'>): Book | null => {
  const index = books.findIndex(book => book.id === id);
  if (index === -1) return null;
  books[index] = { id, ...data };
  return books[index];
};

export const deleteBook = (id: string): boolean => {
  const index = books.findIndex(book => book.id === id);
  if (index === -1) return false;
  books.splice(index, 1);
  return true;
};

export const importBooks = (rows: Omit<Book, 'id'>[]): { added: number; errors: string[] } => {
  const errors: string[] = [];
  let count = 0;

  rows.forEach((row, idx) => {
    const { title, author, publishedYear } = row;
    if (!title || !author || typeof publishedYear !== 'number') {
      errors.push(`Row ${idx + 1}: Invalid or missing fields`);
      return;
    }
    addBook(row);
    count++;
  });

  return { added: count, errors };
};
