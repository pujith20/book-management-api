"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importBooks = exports.deleteBook = exports.updateBook = exports.addBook = exports.getBookById = exports.getAllBooks = void 0;
const uuid_1 = require("uuid");
let books = [];
const getAllBooks = () => books;
exports.getAllBooks = getAllBooks;
const getBookById = (id) => books.find(book => book.id === id);
exports.getBookById = getBookById;
const addBook = (data) => {
    const newBook = Object.assign({ id: (0, uuid_1.v4)() }, data);
    books.push(newBook);
    return newBook;
};
exports.addBook = addBook;
const updateBook = (id, data) => {
    const index = books.findIndex(book => book.id === id);
    if (index === -1)
        return null;
    books[index] = Object.assign({ id }, data);
    return books[index];
};
exports.updateBook = updateBook;
const deleteBook = (id) => {
    const index = books.findIndex(book => book.id === id);
    if (index === -1)
        return false;
    books.splice(index, 1);
    return true;
};
exports.deleteBook = deleteBook;
const importBooks = (rows) => {
    const errors = [];
    let count = 0;
    rows.forEach((row, idx) => {
        const { title, author, publishedYear } = row;
        if (!title || !author || typeof publishedYear !== 'number') {
            errors.push(`Row ${idx + 1}: Invalid or missing fields`);
            return;
        }
        (0, exports.addBook)(row);
        count++;
    });
    return { added: count, errors };
};
exports.importBooks = importBooks;
