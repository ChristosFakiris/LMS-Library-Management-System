
const bookRepository = require('../repositories/bookRepository');

class BookService {
  async createBook(bookData) {
    try {
      return await bookRepository.create(bookData);
    } catch (error) {
      console.error('Error in BookService - createBook:', error);
      throw new Error('Unable to create book');
    }
  }

  async getAllBooks() {
    try {
      return await bookRepository.findAll();
    } catch (error) {
      console.error('Error in BookService - getAllBooks:', error);
      throw new Error('Unable to fetch books');
    }
  }

  async getBookById(bookId) {
    try {
      return await bookRepository.findById(bookId);
    } catch (error) {
      console.error('Error in BookService - getBookById:', error);
      throw new Error('Unable to fetch book');
    }
  }

  async updateBook(bookId, updateData) {
    try {
      return await bookRepository.update(bookId, updateData);
    } catch (error) {
      console.error('Error in BookService - updateBook:', error);
      throw new Error('Unable to update book');
    }
  }

  async deleteBook(bookId) {
    try {
      return await bookRepository.delete(bookId);
    } catch (error) {
      console.error('Error in BookService - deleteBook:', error);
      throw new Error('Unable to delete book');
    }
  }
}

module.exports = new BookService();
