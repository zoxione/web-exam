const router = require('express').Router();
const Library = require('../models/Library');
const Book = require('../models/Book');
const authMiddleware = require('../middlewares/auth');

router.get('/:ownerId', async (req, res) => {
  const ownerId = req.params.ownerId;
  const library = await Library.findOne({ where: { ownerId: ownerId } });
  if (library === null) {
    res.status(404).send({
      success: false,
      message: 'library not found',
    });
  } else {
    res.send(library);
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  const id = req.params.id;
  const library = await Library.findByPk(id);
  if (library === null) {
    res.status(404).send({
      success: false,
      message: 'library not found',
    });
  } else {
    const books = await Book.findAll({
      where: {
        libraryId: library.id,
      },
    });
    if (req.body.countShelves * req.body.capacity >= books.length) {
      library.update(req.body);
      res.send(library);
    } else {
      res.status(400).send({
        success: false,
        message: 'no space',
      });
    }
  }
});

module.exports = router;
