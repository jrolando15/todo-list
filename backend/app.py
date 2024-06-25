from flask import Flask
from flask_mongoengine import MongoEngine
from flask_cors import CORS
from pymongo import MongoClient
import logging
from logging import FileHandler, WARNING

# Import the routes Blueprint
from routes import routes

app = Flask(__name__)

app.config['MONGODB_SETTINGS'] = {
    'db': 'todo-app',
    'host': 'localhost',
    'port': 27017
}

db = MongoEngine(app)
CORS(app, resources={r"/todos/*": {"origins": "*", "methods": ["GET", "POST", "PUT", "DELETE"]}})

# Set up logging
file_handler = FileHandler('errorlog.txt')
file_handler.setLevel(WARNING)
app.logger.addHandler(file_handler)

# Register the routes Blueprint
app.register_blueprint(routes)

# Keep your database connection test code here
with app.app_context():
    try:
        client = MongoClient(app.config['MONGODB_SETTINGS']['host'], app.config['MONGODB_SETTINGS']['port'])
        client.admin.command('ismaster')
        print("Successfully connected to the database!")
        db_name = app.config['MONGODB_SETTINGS']['db']
        collections = client[db_name].list_collection_names()
        print(f"Collections in the database: {collections}")
        if 'todo-list' not in collections:
            print(f"Warning: 'todo-list' collection does not exist in the '{db_name}' database.")
        else:
            print(f"'todo-list' collection found in the '{db_name}' database.")
        count = client[db_name]['todo-list'].count_documents({})
        print(f"There are {count} documents in the 'todo-list' collection.")
    except Exception as e:
        print(f"An error occurred: {str(e)}")
    finally:
        if 'client' in locals():
            client.close()

if __name__ == '__main__':
    app.run(debug=True)



