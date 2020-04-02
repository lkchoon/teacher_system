# Teacher System
This is a RESTful API Project

# Features
- Register students
- Find common students
- Suspend students
- Retrieve a list of students who can receive a given notification

# Project Structure
- server.js : Responsible for starting the server.
- app.js : Configure everything that has to do with Express application. 
- model: Used to stored response model
- teacherSystemDataSource: Handle the database request send back the response
- test: Unit test

# How to run
1. Open teacherSystemDataSource.js and modify below parameters to your MYSQL
   host: "localhost",
   user: "root",
   password: "root",
   database: "teacher_system"
2. Run all the SQL file inside the scripts folder
3. open command line
4. type "npm start" and enter