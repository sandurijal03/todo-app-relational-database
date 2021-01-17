import React, { useEffect, useState } from 'react';
import EditTodo from './EditTodo';

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/todos', {
        method: 'GET',
      });
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const deleteTodo = async (todoId) => {
    try {
      await fetch(`http://localhost:3001/api/todos/${todoId}`, {
        method: 'DELETE',
      });
      setTodos(todos.filter((todo) => todo.todo_id !== todoId));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <table className='table mt-5 text-center'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className='btn btn-danger'
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListTodos;
