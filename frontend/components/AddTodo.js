import React, { useState } from 'react';
import axios from 'axios';

const AddTodo = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [className, setClassName] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTodo = {
      name,
      subject,
      class_name: className,
      due_date: new Date(dueDate).toISOString()
    };

    try {
      const response = await axios.post('http://localhost:5000/todos', newTodo);
      onAdd(response.data);
      setName('');
      setSubject('');
      setClassName('');
      setDueDate('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          className="form-control"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="class">Class:</label>
        <input
          type="text"
          className="form-control"
          id="class"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="dueDate">Due Date:</label>
        <input
          type="date"
          className="form-control"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Add Todo</button>
    </form>
  );
};

export default AddTodo;

