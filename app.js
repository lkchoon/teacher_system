const StudentAcceptedNotificationResponse = require("./model/studentAcceptedNotificationResponse.js");
const StudentListResponse = require("./model/studentListResponse.js");
const ErrorResponse = require("./model/errorResponse.js");

module.exports = function(app, teacherSystemDataSource) {

    app.get("/api/commonstudents", (req, res, next) => {

        if (!req.query.teacher) {
            res.status(400).json(new ErrorResponse("Filter cannot be empty"));
            return;
        }

        teacher = null;

        if (Array.isArray(req.query.teacher)) {
            teacher = req.query.teacher;
        } else {
            teacher = [req.query.teacher];
        }

        teacherArrayInUpperCase = teacher.map(function(x) {
            return x.toUpperCase()
        })

        teacherSystemDataSource
            .getCommonStudents(teacher)
            .then(result => {
                studentArray = [];
                result.forEach(item => {
                    studentArray.push(item.student_email);
                });
                res.status(200).json(new StudentListResponse(studentArray));
            })
            .catch(err => res.status(500).json(new ErrorResponse(err.message)));
    });
    app.post("/api/suspend", (req, res, next) => {
        if (!req.body.student) {
            res.header("Content-Type", "application/json").status(400).json(new ErrorResponse("Student email field cannot be empty"));
            return;
        }

        teacherSystemDataSource
            .suspendStudent(req.body.student)
            .then(result => {
                res.header("Content-Type", "application/json").status(204).end();
            })
            .catch(err => res.status(500).json(new ErrorResponse(err.message)));


    });
    app.post("/api/register", (req, res, next) => {

        if (!req.body.teacher || !req.body.students || !Array.isArray(req.body.students) || req.body.students.length == 0) {
            res.status(400).json(new ErrorResponse("Teacher email and students fields cannot be empty"));
            return;
        }

        let teacher_email = req.body.teacher;
        let students = req.body.students;
        let values = [];

        for (let i = 0; i < students.length; i++) {
            let item = [];
            item.push(teacher_email);
            item.push(students[i]);
            values.push(item);
        };

        teacherSystemDataSource
            .registerStudent(values)
            .then(result => {
                res.header("Content-Type", "application/json").status(204).end();
            })
            .catch(err => res.status(500).json(new ErrorResponse(err.message)));

    });
    app.post("/api/retrievefornotifications", (req, res, next) => {

        if (!req.body.teacher) {
            res.header("Content-Type", "application/json").status(400).json(new ErrorResponse("Teacher field cannot be empty"));
            return;
        }

        teacherSystemDataSource
            .getUnsuspendedStudent(req.body.teacher)
            .then(result => {
                studentArray = [];
                result.forEach(item => {
                    studentArray.push(item.student_email);
                });
                res.status(200).json(new StudentAcceptedNotificationResponse(studentArray));
            })
            .catch(err => res.status(500).json(new ErrorResponse(err.message)));
    });

}