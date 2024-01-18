const router = require('express').Router();
const Book = require('../models/Book');
const authMiddleware = require('../middlewares/auth');
const Library = require('../models/Library');

router.get('/', async (req, res) => {
  const libraryId = req.query.libraryId;
  const books = await Book.findAll({
    where: {
      libraryId: libraryId,
    },
    order: [['name', 'ASC']],
  });
  res.send(books);
});

router.post('/', authMiddleware, async (req, res) => {
  const userLibrary = await Library.findOne({ where: { ownerId: req.user.id } });
  if (userLibrary === null) {
    res.status(404).send({
      success: false,
      message: 'library not found',
    });
  } else {
    const books = await Book.findAll({
      where: {
        libraryId: userLibrary.id,
      },
    });
    if (userLibrary.capacity * userLibrary.countShelves > books.length) {
      const book = new Book({
        name: req.body.name,
        libraryId: userLibrary.id,
      });
      await book.save();
      res.send(book);
    } else {
      res.status(400).send({
        success: false,
        message: 'no space',
      });
    }
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const book = await Book.findByPk(id);
  if (book === null) {
    res.status(404).send({
      success: false,
      message: 'book not found',
    });
  } else {
    res.send(book);
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  const id = req.params.id;
  const book = await Book.findByPk(id);
  if (book === null) {
    res.status(404).send({
      success: false,
      message: 'book not found',
    });
  } else {
    book.update(req.body);
    res.send(book);
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const id = req.params.id;
  const book = await Book.findByPk(id);
  if (book === null) {
    res.status(404).send({
      success: false,
      message: 'book not found',
    });
  } else {
    book.destroy();
    res.send(book);
  }
});

module.exports = router;
