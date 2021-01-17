const { Router } = require('express');
const pool = require('../config/db');

const router = Router();

// create a todo
router.post('/todos', async (req, res) => {
  const { description } = req.body;
  try {
    const newTodo = await pool.query(
      'insert into todo (description) values($1) returning *',
      [description],
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

// get all todo
router.get('/todos', async (req, res) => {
  try {
    const allTodo = await pool.query('select * from todo');
    res.json(allTodo.rows);
  } catch (err) {
    console.error(err);
  }
});

// get a todo
router.get('/todos/:todoId', async (req, res) => {
  const { todoId } = req.params;
  try {
    const todo = await pool.query('select * from todo where todo_id= $1', [
      todoId,
    ]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

// update a todo
router.put('/todos/:todoId', async (req, res) => {
  try {
    const { todoId } = req.params;
    const { description } = req.body;
    await pool.query('update todo set description = $1 where todo_id =  $2', [
      description,
      todoId,
    ]);
    res.json('todo was updated');
  } catch (err) {
    console.error(err.message);
  }
});

// delete a todo
router.delete('/todos/:todoId', async (req, res) => {
  try {
    const { todoId } = req.params;
    await pool.query('delete from todo where todo_id = $1', [todoId]);
    res.json('todo deleted successfully');
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
