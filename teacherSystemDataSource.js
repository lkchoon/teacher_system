const mysql = require('mysql');
class TeacherSystemDataSource {
    constructor() {
        this.connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: "teacher_system"
        });
    }
    getCommonStudents(teacher) {
        let sql = `select distinct student_email from lesson l where UPPER(teacher_email) IN (?) `;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, teacher, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }
	suspendStudent(student){
		let sql = `update student set status = 1 where email = ?`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, student, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
	}
	registerStudent(itemList){
		let sql = `insert into lesson (teacher_email,student_email) values ? `;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, [itemList], (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
	}
	getUnsuspendedStudent(teacher){
		let sql = `select distinct student_email from lesson ` +
        `straight_join student s on student_email = (select s.email where status = 0) ` +
        `where teacher_email = ?`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, teacher, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
	}
    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }
}
module.exports = TeacherSystemDataSource;