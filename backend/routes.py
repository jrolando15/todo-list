from flask import Blueprint, jsonify, request, abort
from models import Todo
from mongoengine.errors import DoesNotExist, ValidationError
from datetime import datetime

routes = Blueprint('routes', __name__)

# Todo Routes

@routes.route('/todos', methods=['GET'])
def get_todos():
    todos = Todo.objects()
    return jsonify([todo.to_json() for todo in todos])

@routes.route('/todos', methods=['POST'])
def create_todo():
    try:
        todo_data = request.get_json() or {}
        print("Received data:", todo_data)  # Keep this for debugging

        # Parse the ISO 8601 date string to a datetime object
        if 'due_date' in todo_data:
            todo_data['due_date'] = datetime.fromisoformat(todo_data['due_date'].replace('Z', '+00:00'))

        todo = Todo(**todo_data)
        todo.save()
        return jsonify(todo.to_json()), 201
    except ValidationError as e:
        print("Validation error:", str(e))  # Keep this for debugging
        return jsonify({"error": f"Invalid data: {str(e)}"}), 400
    except Exception as e:
        print("Unexpected error:", str(e))  # Keep this for debugging
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500
        

@routes.route('/todos/<string:name>', methods=['GET'])
def get_todo_by_name(name):
    try:
        todo = Todo.objects.get(name=name)
        return jsonify(todo.to_json()), 200
    except DoesNotExist:
        abort(404, description="Todo not found")


@routes.route('/todos/<name>', methods=['PUT'])
def update_todo_by_name(name):
    try:
        todo_data = request.get_json()
        if not todo_data:
            return jsonify({"error": "No data provided"}), 400
        
        print(f"Received data: {todo_data}")  # Debug print
        
        todo = Todo.objects.get(name=name)
        if 'due_date' in todo_data:
            todo_data['due_date'] = datetime.fromisoformat(todo_data['due_date'].replace('Z', '+00:00'))
        
        todo.update(**todo_data)
        todo.reload()
        return jsonify(todo.to_json()), 200
    except DoesNotExist:
        return jsonify({"error": "Todo not found"}), 404
    except ValidationError as e:
        return jsonify({"error": f"Invalid data: {str(e)}"}), 400
    except Exception as e:
        print(f"Unexpected error: {str(e)}")  # Debug print
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500

@routes.route('/todos/<string:name>', methods=['DELETE'])
def delete_todo_by_name(name):
    try:
        todo = Todo.objects.get(name=name)
        todo.delete()
        return jsonify({'message': 'Todo deleted successfully'}), 200
    except DoesNotExist:
        abort(404, description="Todo not found")

@routes.route('/todos', methods=['DELETE'])
def delete_all_todos():
    Todo.objects.delete()
    return jsonify({'message': 'All todos deleted successfully'}), 200
