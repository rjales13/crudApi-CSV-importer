<h1 align="center">
<br>
CRUD API with a CSV Importer
</h1>

<p align="center">This CRUD API it's a simple demonstration of how to use the methods: GET, POST, PATCH and DELETE with a plus: An import of a CSV file data and import it doing a POST method. This API is built with Node.js</p>

<hr />

## Features
- **NODEJS**

## Getting started

- run the command: npm i
- run the command: npm run dev
- run the command: node csv/import.js

## API Endoints

- List All Tasks => GET http://localhost:3333/tasks
- Create a Task => POST http://localhost:3333/tasks
    - Body example:
    {
        "title": "Task 02",
        "description": "Descrição para a Task 02"
    }
- Edit a Task => PUT http://localhost:3333/tasks/TASKID
    - Body example:
        {
            "description": "Descrição para a Task 05"
        }
- Update to Complete a Task => PATCH http://localhost:3333/tasks/TASKID/complete
- Delete a Meal => DELETE http://localhost:3333/tasks/TASKID
