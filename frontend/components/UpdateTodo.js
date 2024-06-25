import React, { useState } from 'react';
import axios from 'axios';

const UpdateTodo = ({ todos, updateTodo }) => {
  const [todoName, setTodoName] = useState('');
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [className, setClassName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!todoName) {
      alert('Please enter the name of the todo to update');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const todoToUpdate = todos.find(todo => todo.name.toLowerCase() === todoName.toLowerCase());
      if (!todoToUpdate) {
        setMessage('Todo not found');
        setLoading(false);
        return;
      }
      const updatedTodo = {
        name: name || todoToUpdate.name,
        subject: subject || todoToUpdate.subject,
        class_name: className || todoToUpdate.class_name,
        due_date: dueDate ? new Date(dueDate).toISOString() : todoToUpdate.due_date
      };

      const response = await axios.put(`http://localhost:5000/todos/${encodeURIComponent(todoName)}`, updatedTodo, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      updateTodo(response.data);
      setMessage('Todo updated successfully');
    } catch (error) {
      console.error('Error updating todo:', error);
      setMessage('Failed to update todo');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleUpdate} className="mt-4">
      <h3 className="mb-3">Update Todo</h3>
      <div className="mb-3">
        <input type="text" className="form-control" value={todoName} onChange={(e) => setTodoName(e.target.value)} placeholder="Todo Name" />
      </div>
      <div className="mb-3">
        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      </div>
      <div className="mb-3">
        <input type="text" className="form-control" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" />
      </div>
      <div className="mb-3">
        <input type="text" className="form-control" value={className} onChange={(e) => setClassName(e.target.value)} placeholder="Class" />
      </div>
      <div className="mb-3">
        <input type="date" className="form-control" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Updating...' : 'Update Todo'}
      </button>
      {message && <p className={`mt-3 ${message.includes('successfully') ? 'text-success' : 'text-danger'}`}>{message}</p>}
    </form>
  );
};

export default UpdateTodo;