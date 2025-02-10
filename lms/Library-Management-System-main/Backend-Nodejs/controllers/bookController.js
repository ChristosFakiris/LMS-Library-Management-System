

const bookService = require('../services/bookService');
const authMiddleware = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();

router.post('/', authMiddleware('ADMIN'), async (req, res) => {
  try {
    const book = await bookService.createBook(req.body);
    res.status(201).json({ message: 'Book added successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/', authMiddleware(), async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});