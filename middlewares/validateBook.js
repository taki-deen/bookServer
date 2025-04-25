module.exports = function validateBook(req, res, next) {
  const { name, isbn, aisle, authorId } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).json({ message: "Invalid or missing 'name'" });
  }

  if (!isbn || typeof isbn !== "string") {
    return res.status(400).json({ message: "Invalid or missing 'isbn'" });
  }

  if (!aisle || typeof aisle !== "string") {
    return res.status(400).json({ message: "Invalid or missing 'aisle'" });
  }

  if (!authorId || typeof authorId !== "number") {
    return res.status(400).json({ message: "Invalid or missing 'authorId'" });
  }

  next();
};
