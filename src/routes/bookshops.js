const express = require('express');
const router = express.Router();
const bookshopController = require('../controllers/bookshopController');

/**
 * @swagger
 * /bookshops:
 *   get:
 *     summary: Get all bookshops or filter by bookId
 *     tags: [Bookshops]
 *     parameters:
 *       - in: query
 *         name: bookId
 *         schema:
 *           type: string
 *         description: Filter bookshops by book ID
 *     responses:
 *       200:
 *         description: List of bookshops
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bookshop'
 */
router.get('/', bookshopController.getAllBookshops);

/**
 * @swagger
 * /bookshops/{id}:
 *   get:
 *     summary: Get a bookshop by ID
 *     tags: [Bookshops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bookshop ID
 *     responses:
 *       200:
 *         description: Bookshop details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bookshop'
 *       404:
 *         description: Bookshop not found
 */
router.get('/:id', bookshopController.getBookshopById);

/**
 * @swagger
 * /bookshops:
 *   post:
 *     summary: Create a new bookshop
 *     tags: [Bookshops]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bookshop'
 *     responses:
 *       201:
 *         description: Bookshop created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bookshop'
 *       400:
 *         description: Invalid input
 */
router.post('/', bookshopController.createBookshop);

/**
 * @swagger
 * /bookshops/{id}:
 *   put:
 *     summary: Update a bookshop
 *     tags: [Bookshops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bookshop ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bookshop'
 *     responses:
 *       200:
 *         description: Bookshop updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bookshop'
 *       404:
 *         description: Bookshop not found
 */
router.put('/:id', bookshopController.updateBookshop);

/**
 * @swagger
 * /bookshops/{id}:
 *   delete:
 *     summary: Delete a bookshop
 *     tags: [Bookshops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bookshop ID
 *     responses:
 *       200:
 *         description: Bookshop deleted successfully
 *       404:
 *         description: Bookshop not found
 */
router.delete('/:id', bookshopController.deleteBookshop);

module.exports = router; 