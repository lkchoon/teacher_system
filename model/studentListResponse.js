var StudentListResponse = function (students) {
this.students = students;
}

StudentListResponse.prototype.students = {}

StudentListResponse.prototype.setStudents = function (students) {
this.students = students;
}

module.exports = StudentListResponse;
