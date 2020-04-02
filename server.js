const express = require("express");
const TeacherSystemDataSource = require("./teacherSystemDataSource.js");
teacherSystemDataSource = new TeacherSystemDataSource();
const app = express();
const bodyParser = require('body-parser')
const port = 8000;
const server = app.listen(port, () => {
    console.log('We are live on ' + port);
});

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());
appController = require('./app.js')(app,teacherSystemDataSource);
