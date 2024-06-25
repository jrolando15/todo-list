import React from 'react';
import axios from 'axios';

const DeleteAllTodos = () => {
  const deleteAllTodos = async () => {
    try {
      await axios.delete('http://localhost:5000/todos');
      alert('All todos have been deleted');
    } catch (error) {
      console.error('Error deleting all todos:', error);
      alert('Failed to delete all todos');
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-center mb-4">Delete All Todos</h2>
      <div className="text-center">
        <button className="btn btn-danger" onClick={deleteAllTodos}>Delete All Todos</button>
      </div>
    </div>
  );
};

export default DeleteAllTodos;
