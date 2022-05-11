const ProductModel = require("./model");

// add new book
exports.addNewBook = async (req, res) => {
  const {
    publishingTitle,
    originalTitle,
    translator,
    originalAuthor,
    ISBN,
    marketPrice,
  } = req.body;

  try {
    const existingBook = await findBookByISBN(ISBN, res);
    if (existingBook) {
      res.status(400).json({
        desc: "Book already exist - Please check again",
      });
    } else {
      const newBook = await ProductModel.create({
        publishingTitle,
        originalTitle,
        translator,
        originalAuthor,
        ISBN,
        marketPrice,
      });
      res.status(201).json({
        newBook,
        desc: "New book added",
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in addNewBook",
    });
  }
};

// get all books
exports.getAllBooks = async (req, res) => {
  try {
    const allBooks = await ProductModel.find();
    res.status(200).send({
      allBooks,
    });
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in getAllBooks",
    });
  }
};

// get specific book
exports.getBookByISBN = async (req, res) => {
  const ISBN = req.params.isbn;
  try {
    const book = await ProductModel.findOne({ ISBN });
    res.status(200).send({
      book,
    });
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in getBookByISBN",
    });
  }
};

// update specific book
exports.updateBookByISBN = async (req, res) => {
  let {
    publishingTitle,
    originalTitle,
    translator,
    originalAuthor,
    ISBN,
    marketPrice,
  } = req.body;
  if (!publishingTitle) {
    publishingTitle = undefined;
  }
  if (!originalTitle) {
    originalTitle = undefined;
  }
  if (!translator) {
    translator = undefined;
  }
  if (!originalAuthor) {
    originalAuthor = undefined;
  }
  if (!marketPrice) {
    marketPrice = undefined;
  }
  try {
    const updatedBook = await ProductModel.findOneAndUpdate(
      { ISBN },
      {
        $set: {
            publishingTitle,
            originalTitle,
            translator,
            originalAuthor,
            ISBN,
            marketPrice,
        },
      },
      {
        new: true,
        upsert: false,
        omitUndefined: true,
      }
    );
    res.status(200).send({
      desc: "Book data updated successfully",
      updatedBook,
    });
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in updateBookByISBN",
    });
  }
};

// delete specific book
exports.deleteBookByISBN = async (req, res) => {
  const ISBN = req.params.isbn;
  try {
    await ProductModel.deleteOne({ ISBN });
    res.status(202).json({ desc: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in deleteBookByISBN",
    });
  }
};

// check ISBN duplicates
const findBookByISBN = async (ISBN, res) => {
  try {
    const existingBook = await ProductModel.findOne({ ISBN: ISBN });
    return existingBook;
  } catch (error) {
    res.status(422).json({
      error,
      desc: "Error occurred in findBookByISBN",
    });
  }
};
