from mongoengine import Document, StringField, DateTimeField

class Todo(Document):
    meta = {'collection': 'todo-list'}
    name = StringField(required=True)
    subject = StringField(required=True)
    class_name = StringField(required=True)  # Use 'class_name' instead of 'class'
    due_date = DateTimeField(required=True)

    def to_json(self):
        return {
            "name": self.name,
            "subject": self.subject,
            "class_name": self.class_name,
            "due_date": self.due_date.isoformat() if self.due_date else None
        }
