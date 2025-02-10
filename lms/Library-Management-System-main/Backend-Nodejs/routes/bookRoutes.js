// routes/bookRoutes.js

const express = require('express');
const bookService = require('../services/bookService');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management endpoints
 */

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Add a new book (Admin only)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       201:
 *         description: Book added successfully
 *       403:
 *         description: Forbidden (only Admin can add books)
 *       500:
 *         description: Internal server error
 */
router.post('/', authMiddleware('ADMIN'), async (req, res) => {
  try {
    const book = await bookService.createBook(req.body);
    res.status(201).json({ message: 'Book added successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books (Authenticated users only)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns a list of books
 *       401:
 *         description: Unauthorized (Token required)
 *       500:
 *         description: Internal server error
 */
router.get('/', authMiddleware(), async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
