import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import * as bookService from '../services/bookService';

export const importCSV = (req: Request, res: Response) => {
  const file = req.file;
  if (!file) return res.status(400).json({ message: 'CSV file is required' });

  const data = fs.readFileSync(file.path, 'utf-8');
  const lines = data.trim().split('\n');
  const rows = lines.map((line, idx) => {
    const [title, author, publishedYearStr] = line.split(',');
    const publishedYear = Number(publishedYearStr);
    return { title: title?.trim(), author: author?.trim(), publishedYear };
  });

  const result = bookService.importBooks(rows);
  res.json({ addedBooksCount: result.added, errorRows: result.errors });
};
