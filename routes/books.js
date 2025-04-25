const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const validateBook = require("../middlewares/validateBook");

router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);

router.post("/", validateBook, bookController.createBook); // ← هنا استخدمنا الـ middleware
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

module.exports = router;
