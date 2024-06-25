import React, { useState, useCallback } from 'react';
import axios from 'axios';

const GetAllTodos = ({ refreshTodos }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [todos, setTodos] = useState([]);

  const fetchAllTodos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:5000/todos');
      setTodos(response.data);
      refreshTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setError('Failed to fetch todos');
    }

    setLoading(false);
  }, [refreshTodos]);

  return (
    <div className="mt-4">
      <h2 className="text-center mb-4">Get All Todos</h2>
      <div className="text-center mb-4">
        <button className="btn btn-primary" onClick={fetchAllTodos} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch All Todos'}
        </button>
      </div>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <ul className="list-group">
        {todos.map((todo) => (
          <li key={todo.name} className="list-group-item">
            {todo.name} - {todo.subject} - {todo.class_name} - {new Date(todo.due_date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllTodos;





