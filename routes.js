const express = require("express");
const router = express.Router();

const {
    addNewBook,
    getAllBooks,
    getBookByISBN,
    updateBookByISBN,
    deleteBookByISBN,
  } = require("./controllers");

// books
router.route("/book").post(addNewBook);
router.route("/books").get(getAllBooks);
router.route("/book/:isbn").get(getBookByISBN);
router.route("/book").put(updateBookByISBN);
router
  .route("/book/:isbn")
  .delete(deleteBookByISBN);

module.exports = router;