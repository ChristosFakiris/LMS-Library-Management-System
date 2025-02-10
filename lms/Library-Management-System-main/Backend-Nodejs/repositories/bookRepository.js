// repositories/bookRepository.js

const Book = require('../models/Book');

class BookRepository {
  async create(bookData) {
    try {
      const book = new Book(bookData);
      return await book.save();
    } catch (error) {
      console.error('Error in BookRepository - create:', error);
      throw new Error('Unable to create book');
    }
  }

  async findAll() {
    try {
      return await Book.find();
    } catch (error) {
      console.error('Error in BookRepository - findAll:', error);
      throw new Error('Unable to fetch books');
    }
  }

  async findById(bookId) {
    try {
      return await Book.findById(bookId);
    } catch (error) {
      console.error('Error in BookRepository - findById:', error);
      throw new Error('Unable to fetch book');
    }
  }

  async update(bookId, updateData) {
    try {
      return await Book.findByIdAndUpdate(bookId, updateData, { new: true });
    } catch (error) {
      console.error('Error in BookRepository - update:', error);
      throw new Error('Unable to update book');
    }
  }

  async delete(bookId) {
    try {
      return await Book.findByIdAndDelete(bookId);
    } catch (error) {
      console.error('Error in BookRepository - delete:', error);
      throw new Error('Unable to delete book');
    }
  }
}
module.exports = new BookRepository();