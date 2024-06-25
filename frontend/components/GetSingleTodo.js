import React, { useState } from 'react';
import axios from 'axios';

const GetSingleTodo = () => {
  const [todoName, setTodoName] = useState('');
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSingleTodo = async () => {
    if (!todoName) {
      alert('Please enter a todo name');
      return;
    }
  
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/todos/${encodeURIComponent(todoName)}`);
      setTodo(response.data);
    } catch (error) {
      console.error('Error fetching single todo:', error);
      setError('Todo not found or an error occurred');
      setTodo(null);
    }
    setLoading(false);
  };

  return (
    <div className="mt-4">
      <h2 className="text-center mb-4">Get Single Todo</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
          placeholder="Enter Todo Name"
        />
        <button 
          className="btn btn-primary" 
          onClick={fetchSingleTodo} 
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Fetch Todo'}
        </button>
      </div>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {todo && (
        <div className="card mt-4">
          <div className="card-body">
            <h3 className="card-title">Todo Details:</h3>
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><strong>ID:</strong> {todo.id}</li>
              <li className="list-group-item"><strong>Name:</strong> {todo.name}</li>
              <li className="list-group-item"><strong>Subject:</strong> {todo.subject}</li>
              <li className="list-group-item"><strong>Class:</strong> {todo.class_name}</li>
              <li className="list-group-item"><strong>Due Date:</strong> {new Date(todo.due_date).toLocaleDateString()}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetSingleTodo;

