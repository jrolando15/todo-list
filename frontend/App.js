import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import UpdateTodo from './components/UpdateTodo';
import GetAllTodos from './components/GetAllTodos';
import GetSingleTodo from './components/GetSingleTodo';
import DeleteAllTodos from './components/DeleteAllTodos';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (newTodo) => {
    try {
      const response = await axios.post('http://localhost:5000/todos', newTodo);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateTodo = async (updatedTodo) => {
    try {
      await axios.put(`http://localhost:5000/todos/${encodeURIComponent(updatedTodo.name)}`, updatedTodo);
      setTodos(todos.map((todo) => (todo.name === updatedTodo.name ? updatedTodo : todo)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (name) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${encodeURIComponent(name)}`);
      setTodos(todos.filter((todo) => todo.name !== name));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const deleteAllTodos = async () => {
    try {
      await axios.delete('http://localhost:5000/todos');
      setTodos([]);
    } catch (error) {
      console.error('Error deleting all todos:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Todo List</h1>
      <AddTodo onAdd={addTodo} />
      <TodoList todos={todos} onDelete={deleteTodo} onUpdate={updateTodo} />
      <div className="additional-features mt-4">
        <h2 className="text-center">Additional Features</h2>
        <div className="row">
          <div className="col-md-4">
            <GetAllTodos refreshTodos={fetchTodos} />
          </div>
          <div className="col-md-4">
            <GetSingleTodo />
          </div>
          <div className="col-md-4">
            <UpdateTodo todos={todos} updateTodo={updateTodo} />
          </div>
        </div>
        <div className="text-center mt-4">
          <DeleteAllTodos onDeleteAll={deleteAllTodos} />
        </div>
      </div>
    </div>
  );
}

export default App;




