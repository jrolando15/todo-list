import React from 'react';

const TodoList = ({ todos, deleteTodo }) => {
  return (
    <div>
      <h2 className="text-center mb-4">Todo List</h2>
      <ul className="list-group">
        {todos.map((todo) => (
          <li key={todo.id} className="list-group-item">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{todo.name}</h5>
              <button className="btn btn-danger btn-sm" onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
            <p className="mb-1"><strong>Subject:</strong> {todo.subject}</p>
            <p className="mb-1"><strong>Class:</strong> {todo.class_name}</p>
            <p className="mb-1"><strong>Due Date:</strong> {new Date(todo.due_date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;


