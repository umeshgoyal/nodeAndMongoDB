mongo todoapp --eval "db.dropDatabase()" 
mongoimport -d todoapp -c todos --file data/export_todoapp_todos.json
