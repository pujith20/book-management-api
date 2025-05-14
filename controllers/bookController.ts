import { Request, Response, NextFunction } from 'express';
import * as bookService from '../services/bookService';

export const getBooks = (req: Request, res: Response) => {
  res.json(bookService.getAllBooks());
};

export const getBook = (req: Request, res: Response) => {
  const book = bookService.getBookById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
};

export const createBook = (req: Request, res: Response) => {
  const { title, author, publishedYear } = req.body;
  if (!title || !author || typeof publishedYear !== 'number') {
    return res.status(400).json({ message: 'Invalid book data' });
  }
  const book = bookService.addBook({ title, author, publishedYear });
  res.status(201).json(book);
};

export const updateBook = (req: Request, res: Response) => {
  const { title, author, publishedYear } = req.body;
  const updated = bookService.updateBook(req.params.id, { title, author, publishedYear });
  if (!updated) return res.status(404).json({ message: 'Book not found' });
  res.json(updated);
};

export const deleteBook = (req: Request, res: Response) => {
  const deleted = bookService.deleteBook(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Book not found' });
  res.json({ message: 'Book deleted successfully' });
};
