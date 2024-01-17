const router = require('express').Router();
const Task = require('../models/Task');
const authMiddleware = require('../middlewares/auth');

router.get('/', async (req, res) => {
  const tasks = await Task.findAll({
    // where: {
    //   userId: req.user.id,
    // },
  });
  res.send(tasks);
});

router.post('/', authMiddleware, async (req, res) => {
  const task = new Task();
  task.name = req.body.name;
  task.userId = req.user.id;
  await task.save();
  res.send(task);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const task = await Task.findByPk(id);
  if (task === null) {
    res.status(404).send({
      success: false,
      message: 'task not found',
    });
  } else {
    res.send(task);
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  const id = req.params.id;
  const task = await Task.findByPk(id);
  if (task === null) {
    res.status(404).send({
      success: false,
      message: 'task not found',
    });
  } else {
    task.update(req.body);
    res.send(task);
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const id = req.params.id;
  const task = await Task.findByPk(id);
  if (task === null) {
    res.status(404).send({
      success: false,
      message: 'task not found',
    });
  } else {
    task.destroy();
    res.send(task);
  }
});

module.exports = router;
